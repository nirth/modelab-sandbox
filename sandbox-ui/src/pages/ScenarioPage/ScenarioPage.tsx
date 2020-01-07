import React, { useReducer } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import { Dimmer, Loader, Container, Grid } from 'semantic-ui-react'
import ReactAce from 'react-ace-editor'
import { Tx, TxType } from '../../datamodel/core'
import { ScenarioStatus } from './ScenarioStatus'
import { TxList } from './TxList'
import { evaluateApp } from '../../apps/evaluateApp'

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

const codeSample = `
onTx((tx) => {
  console.log('onTx', tx.amount)
  return true
})

onDirectDebitAnnouncement((tx) => {
  const {amount} = tx
  console.log('onDirectDebitAnnouncement', amount)
  if (tx.amount > 500) {
    return false
  } else {
    return true
  }
})
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
}

const initialState: ScenarioState = {
  scenarioId: '',
  currentTxIndex: -1,
  declinedTxIndicies: [],
  txsLoaded: false,
  txs: [],
  balance: 0,
  appCode: codeSample,
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
      const { currentTxIndex, appCode } = state
      const nextTxIndex = currentTxIndex + 1
      const nextTx = state.txs[nextTxIndex]

      const [shouldContinueExecution, actions] = evaluateApp(appCode)(nextTx)

      if (shouldContinueExecution) {
        const nextBalance = computeBalance(state.balance, nextTx)
        return {
          ...state,
          balance: nextBalance,
          currentTxIndex: nextTxIndex,
        }
      } else {
        return {
          ...state,
          currentTxIndex: nextTxIndex,
          declinedTxIndicies: state.declinedTxIndicies.concat([
            nextTxIndex as any,
          ]),
        }
      }

    case 'UpdateCode':
      return { ...state, appCode: payload }
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
    const { txs, currentTxIndex, declinedTxIndicies, balance } = state

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
            <TxList
              txs={txs}
              currentTxIndex={currentTxIndex}
              declinedTxIndicies={declinedTxIndicies}
            />
          </Grid.Column>
          <Grid.Column>
            <ReactAce
              mode="javascript"
              theme="eclipse"
              setReadOnly={false}
              style={{ height: '100%', width: '700px' }}
              setValue={codeSample}
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
