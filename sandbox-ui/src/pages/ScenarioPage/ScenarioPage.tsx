import React, { useReducer } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import { Dimmer, Loader, Segment, Container } from 'semantic-ui-react'
import { TxDisplay } from './TxDisplay'
import { Tx } from '../../datamodel/core'
import { ScenarioControls } from './ScenarioControls'

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
  currentTxIndex: 0,
  txsLoaded: false,
  txs: [],
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
      return { ...state, currentTxIndex: currentTxIndex + 1 }
  }
  return state
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

  console.log('render')
  if (state.txs?.length > 0) {
    const { txs, currentTxIndex } = state

    return (
      <Container style={{ marginTop: '3em' }}>
        <ScenarioControls
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
      </Container>
    )
  }

  return <div>Parsing</div>
}

export { ScenarioPage }
