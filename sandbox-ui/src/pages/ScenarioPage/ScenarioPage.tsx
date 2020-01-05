import React, { useReducer } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import { Dimmer, Loader, Segment, Container, Grid } from 'semantic-ui-react'
import ReactAce from 'react-ace-editor'
import { TxDisplay } from './TxDisplay'
import { Tx, TxType } from '../../datamodel/core'
import { ScenarioStatus } from './ScenarioStatus'

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

const initialState = {
  scenarioId: '',
  currentTxIndex: -1,
  txsLoaded: false,
  txs: [],
  balance: 0,
  code: '',
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
      return { ...state, currentTxIndex: -1 }
    case 'NextTx':
      const { currentTxIndex } = state
      const nextTxIndex = currentTxIndex + 1
      const nextTx = state.txs[nextTxIndex]
      const nextBalance = computeBalance(state.balance, nextTx)

      const compiledApp = new Function(
        'tx',
        `
        const actions = [];

        ${state.code}

        return actions
      `
      )

      console.log('compiledApp', compiledApp, compiledApp(nextTx))

      return {
        ...state,
        balance: nextBalance,
        currentTxIndex: nextTxIndex,
      }
    case 'UpdateCode':
      return { ...state, code: payload }
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
    const { txs, currentTxIndex, balance } = state

    return (
      <Container>
        <Grid columns={3}>
          <Grid.Column style={{ minWidth: '500px' }}>
            <ScenarioStatus
              balance={balance}
              onPause={() => dispatch({ type: 'PauseScenario', payload: {} })}
              onPlay={() => dispatch({ type: 'PlayScenario', payload: {} })}
              onReset={() => dispatch({ type: 'ResetScenario', payload: {} })}
              onNext={() => dispatch({ type: 'NextTx', payload: {} })}
            />
            <Segment>
              {txs.map((tx: Tx, index: number) => {
                const key = `${tx.type}--${tx.datetime}--${tx.amount}`
                const isCurrent = currentTxIndex === index
                const isExecuted = currentTxIndex > index

                return (
                  <TxDisplay
                    key={key}
                    current={isCurrent}
                    executed={isExecuted}
                    tx={tx}
                  />
                )
              })}
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <ReactAce
              mode="javascript"
              theme="eclipse"
              setReadOnly={false}
              style={{ height: '100%', width: '700px' }}
              onChange={(code: string) => {
                dispatch({ type: 'UpdateCode', payload: code })
              }}
            />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }

  return <div>Parsing</div>
}

export { ScenarioPage }
