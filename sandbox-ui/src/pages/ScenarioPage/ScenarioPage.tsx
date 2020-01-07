import React, { useReducer } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import { Dimmer, Loader, Container, Grid } from 'semantic-ui-react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-github'
import { Tx, TxType } from '../../datamodel/core'
import { ScenarioStatus } from './ScenarioStatus'
import { TxList } from './TxList'
import { evaluateApp } from '../../apps/evaluateApp'
import { CompiledApp, Action, ActionType } from '../../datamodel/marketplace'
import { sampleAppCode, emptyApp } from '../../apps/sample-app'
import { Outcomes } from './Outcomes'

const findScenarioQuery = gql`
  query FindScenario($slug: String!) @client {
    scenario(slug: $slug) @client {
      id
      txs {
        type
        datetime
        amount
        sender
        receiver

        ... on DirectDebitAnnouncementTx @client {
          creditorCustomer
          creditorBankAccount
          debitorCustomer
          debitorBankAccount
        }
        ... on DirectDebitPaymentTx @client {
          creditorCustomer
          creditorBankAccount
          debitorCustomer
          debitorBankAccount
        }
        ... on PaymentTx @client {
          orderingCustomer
          orderingBankAccount
          beneficiaryCustomer
          beneficiaryBankAccount
        }
      }
    }
  }
`

const LoadingState = (props: any) => (
  <Dimmer active>
    <Loader />
  </Dimmer>
)

const ErrorState = (props: any) => <div>Oopsie dasie</div>

type ScenarioState = {
  scenarioId: string
  currentTxIndex: number
  declinedTxIndicies: number[]
  txsLoaded: boolean
  txs: Tx[]
  balance: number
  appCode: string
  compiledApp: CompiledApp
  outcomes: Action[]
}

const initialState: ScenarioState = {
  scenarioId: '',
  currentTxIndex: -1,
  declinedTxIndicies: [],
  txsLoaded: false,
  txs: [],
  balance: 0,
  appCode: sampleAppCode,
  compiledApp: evaluateApp(sampleAppCode),
  outcomes: [],
}

const computeBalance = (balance: number, tx: Tx): number => {
  if (tx.type === TxType.DirectDebitPayment) {
    return balance - parseFloat(tx.amount)
  } else if (tx.type === TxType.Payment) {
    return balance + parseFloat(tx.amount)
  }
  return balance
}

const scenarioReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TxsLoaded':
      const { txs, id } = payload
      return { ...state, scenarioId: id, txsLoaded: true, txs }
    case 'ResetScenario':
      return {
        ...state,
        declinedTxIndicies: [],
        balance: 0,
        currentTxIndex: -1,
        outcomes: [],
      }
    case 'NextTx':
      const {
        currentTxIndex,
        appCode,
        compiledApp: maybeCompiledApp,
        outcomes,
      } = state
      const nextTxIndex = currentTxIndex + 1
      const nextTx = state.txs[nextTxIndex]
      const compiledApp =
        maybeCompiledApp === emptyApp ? evaluateApp(appCode) : maybeCompiledApp

      const [shouldContinueExecution, actions] = compiledApp(nextTx)

      if (shouldContinueExecution) {
        const nextBalance = computeBalance(state.balance, nextTx)
        return {
          ...state,
          balance: nextBalance,
          currentTxIndex: nextTxIndex,
          outcomes: outcomes.concat(actions),
          compiledApp,
        }
      } else {
        return {
          ...state,
          currentTxIndex: nextTxIndex,
          declinedTxIndicies: state.declinedTxIndicies.concat([
            nextTxIndex as any,
          ]),
          outcomes: outcomes.concat(actions).concat([
            {
              type: ActionType.Declined,
              payload: {
                heading: 'Payment Declined',
                body: `Transaction of ${nextTx.amount} is declined`,
              },
            },
          ]),
          compiledApp,
        }
      }

    case 'UpdateCode':
      return {
        ...state,
        appCode: payload,
        compiledApp: emptyApp,
      }
    default:
      return state
  }
}

const ScenarioPage = () => {
  const { scenarioSlug } = useParams()
  const [state, dispatch] = useReducer(scenarioReducer, initialState)
  const { loading, error, data }: any = useQuery(findScenarioQuery, {
    variables: { slug: scenarioSlug },
  })

  if (loading || error) {
    return loading ? <LoadingState /> : <ErrorState />
  }

  if (
    state.scenarioId !== data.scenario.id ||
    (state.txsLoaded === false && data?.scenario?.txs?.length > 0)
  ) {
    dispatch({ type: 'TxsLoaded', payload: data.scenario })
  }

  if (state.txs?.length > 0) {
    const {
      appCode,
      txs,
      currentTxIndex,
      declinedTxIndicies,
      balance,
      outcomes,
    } = state

    return (
      <Container style={{ minWidth: '100vw' }}>
        <Grid columns={3}>
          <Grid.Column>
            <ScenarioStatus
              balance={balance}
              onPause={() => dispatch({ type: 'PauseScenario', payload: {} })}
              onPlay={() => dispatch({ type: 'PlayScenario', payload: {} })}
              onReset={() => dispatch({ type: 'ResetScenario', payload: {} })}
              onNext={() => dispatch({ type: 'NextTx', payload: {} })}
            />
            <TxList
              txs={txs}
              currentTxIndex={currentTxIndex}
              declinedTxIndicies={declinedTxIndicies}
            />
          </Grid.Column>
          <Grid.Column>
            <AceEditor
              mode="javascript"
              theme="github"
              value={appCode}
              setOptions={{ useWorker: false }}
              style={{ height: '100%', width: '100%' }}
              onChange={(code: string) => {
                dispatch({ type: 'UpdateCode', payload: code })
              }}
            />
          </Grid.Column>
          <Grid.Column>
            <Outcomes outcomes={outcomes} />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }

  return <div>Parsing</div>
}

export { ScenarioPage }
