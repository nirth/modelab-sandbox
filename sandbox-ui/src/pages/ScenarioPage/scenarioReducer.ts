import { ActionType } from '../../datamodel/marketplace'
import { emptyApp, sampleAppCode } from '../../apps/sample-app'
import { ScenarioState } from './datamodel'
import { TxType, Tx } from '../../sbdk/datamodel'
import { evaluateApp } from '../../apps/evaluateApp'

const computeBalance = (balance: number, tx: Tx): number => {
  if (tx.type === TxType.DirectDebitPayment) {
    return balance - parseFloat(tx.amount)
  } else if (tx.type === TxType.CreditTransfer) {
    return balance + parseFloat(tx.amount)
  }
  return balance
}

export const initialScenarioState: ScenarioState = {
  scenarioId: '',
  currentTxIndex: -1,
  declinedTxIndicies: [],
  txsLoaded: false,
  txs: [],
  balances: {
    currentAccount: 0,
    savingsAccount: 0,
    securitiesAccount: 0,
    bitcoinAccount: 0,
  },
  appCode: sampleAppCode,
  compiledApp: evaluateApp(sampleAppCode),
  outcomes: [],
}

export const scenarioReducer = (state, { type, payload }): ScenarioState => {
  switch (type) {
    case 'TxsLoaded':
      const { txs, id } = payload
      return { ...state, scenarioId: id, txsLoaded: true, txs }
    case 'ResetScenario':
      return {
        ...state,
        declinedTxIndicies: [],
        balances: {
          currentAccount: 0,
          savingsAccount: 0,
          securitiesAccount: 0,
          bitcoinAccount: 0,
        },
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

      if (nextTxIndex >= state.txs.length) {
        return {
          ...state,
          outcomes: outcomes.concat({
            type: ActionType.ScenarioFinished,
            payload: {},
          }),
        }
      }

      const compiledApp =
        maybeCompiledApp === emptyApp ? evaluateApp(appCode) : maybeCompiledApp

      const [shouldContinueExecution, actions] = compiledApp(nextTx)

      if (shouldContinueExecution) {
        const nextBalance = computeBalance(
          state.balances.currentAccount,
          nextTx
        )

        return {
          ...state,
          balances: {
            ...state.balances,
            currentAccount: nextBalance,
          },
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
