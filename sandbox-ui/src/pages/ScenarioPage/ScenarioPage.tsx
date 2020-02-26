import React, { useReducer } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useParams } from 'react-router-dom'
import gql from 'graphql-tag'
import { Container, Grid } from 'semantic-ui-react'
import { ScenarioStatus } from './ScenarioStatus'
import { TxList } from './TxList'
import { Outcomes } from './Outcomes'
import {
  scenarioPageReducer,
  initialScenarioPageState,
} from './scenarioPageReducer'
import { AppEditor } from './AppEditor'
import { LoadingState } from '../../components/LoadingDisplay'
import { ErrorState } from '../../components/ErrorDisplay'

const findScenarioQuery = gql`
  query FindScenario($slug: String!) @client {
    scenario(slug: $slug) @client {
      id
      txs {
        id
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
        ... on CreditTransferTx @client {
          creditorCustomer
          creditorBankAccount
          debitorCustomer
          debitorBankAccount
        }
      }
    }
  }
`

const containerStyles = {
  minWidth: '100vw',
  paddingLeft: '1.5em',
  paddingRight: '1.5em',
}

const ScenarioPage = () => {
  const { scenarioSlug } = useParams()
  const [state, dispatch] = useReducer(
    scenarioPageReducer,
    initialScenarioPageState
  )
  const { loading, error, data }: any = useQuery(findScenarioQuery, {
    variables: { slug: scenarioSlug },
  })
  const scenarioSelected = scenarioSlug !== undefined

  if (!scenarioSelected) {
    return (
      <Container style={containerStyles}>
        <Grid columns={3}>
          <Grid.Column>
            <ScenarioStatus
              onPause={() => dispatch({ type: 'PauseScenario', payload: {} })}
              onPlay={() => dispatch({ type: 'PlayScenario', payload: {} })}
              onReset={() => dispatch({ type: 'ResetScenario', payload: {} })}
              onNext={() => dispatch({ type: 'NextTx', payload: {} })}
            />
          </Grid.Column>
          <Grid.Column />
          <Grid.Column />
        </Grid>
      </Container>
    )
  }

  if (loading || error) {
    return loading ? <LoadingState /> : <ErrorState error={error} />
  }

  if (
    state.scenarioId !== data.scenario.id ||
    (state.scenarioLoaded === false && data?.scenario?.txs?.length > 0)
  ) {
    dispatch({ type: 'ScenarioSelected', payload: data.scenario })
    return <LoadingState />
  } else {
    console.log('Scenario Changed!')
  }

  if (state.txs?.length > 0) {
    const {
      accounts,
      txIndex,
      txs,
      declinedTxs,
      bankingAppSourceCode,
      outcomes,
    } = state

    return (
      <Container style={containerStyles}>
        <Grid columns={3}>
          <Grid.Column>
            <ScenarioStatus
              onPause={() => dispatch({ type: 'PauseScenario', payload: {} })}
              onPlay={() => dispatch({ type: 'PlayScenario', payload: {} })}
              onReset={() => dispatch({ type: 'ResetScenario', payload: {} })}
              onNext={() => dispatch({ type: 'PlayNextTx', payload: {} })}
            />
            <TxList
              txs={txs}
              currentTxIndex={txIndex}
              declinedTxFks={declinedTxs.map((tx) => tx.id)}
            />
          </Grid.Column>
          <Grid.Column>
            <AppEditor
              onChange={(sourceCode: string) => {
                dispatch({
                  type: 'BankingAppSourceCodeUpdated',
                  payload: { sourceCode },
                })
              }}
              appSourceCode={bankingAppSourceCode}
            />
          </Grid.Column>
          <Grid.Column>
            <Outcomes accounts={accounts} outcomes={outcomes} />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }

  return <div>Parsing</div>
}

export { ScenarioPage }
