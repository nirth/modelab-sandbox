import {
  Account,
  Accounts,
  Scenario,
  Tx,
  Outcome,
  OutcomeKind,
} from './datamodel'
import { transpileApp } from './banking-apps/transpileApp'
import { CompiledApp } from '../datamodel/marketplace'
import { isDefinedObject } from '../utils'

/*
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
      */

/**
 * case 'NextTx':
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
 */

const resolveAccountsMap = (accounts: Account[]): Accounts =>
  accounts.reduce((accountsMap: Accounts, account: Account) => {
    return {
      ...accountsMap,
      [account.paymentInstrument]: account,
    }
  }, {})

export class ScenarioPlayer {
  _scenario?: Scenario
  _txs: Tx[]
  _initialCustomerAccounts: any
  _customerAccounts: Accounts
  _bankingApp?: CompiledApp
  _currentTxIndex: number

  constructor(initialCustomerAccounts: Account[]) {
    this._initialCustomerAccounts = { ...initialCustomerAccounts }
    this._customerAccounts = resolveAccountsMap(initialCustomerAccounts)
    this._currentTxIndex = -1
    this._txs = []

    this.reset()
  }

  get balances(): Accounts {
    return { ...this._customerAccounts }
  }

  get readyToPlay(): boolean {
    return (
      typeof this._bankingApp === 'function' &&
      isDefinedObject(this._customerAccounts) &&
      isDefinedObject(this._scenario)
    )
  }

  initializeScenario(scenario: any) {
    this._scenario = scenario
    this._txs = scenario.txs.concat([])
    this.reset()
  }

  initializeBankingApp(bankingAppSourceCode: string) {
    this._bankingApp = transpileApp(bankingAppSourceCode)
  }

  play(): Outcome[] {
    const outcomes: Outcome[] = []

    if (this.readyToPlay) {
      if (!(typeof this._scenario === 'object' && this._scenario !== null)) {
        throw new Error('ScenarioPlayer.play: Scenario is not defined')
      }

      const app = this._bankingApp
      const currentTxIndex = this._currentTxIndex
      const nextTxIndex = currentTxIndex + 1
      const nextTx = this._txs[nextTxIndex]

      if (typeof app !== 'function') {
        throw new Error('ScenarioPlayer.play: App is not defined')
      }

      const [shouldContinueExecution, actions] = app(nextTx)

      if (shouldContinueExecution) {
      } else {
        outcomes.push({
          kind: OutcomeKind.Declined,
          heading: 'Payment Declined',
          payload: { body: `Transaction of ${nextTx.amount} is declined` },
        })
      }

      const isLastTx = nextTxIndex === this._txs.length

      if (isLastTx) {
        outcomes.push({
          kind: OutcomeKind.Finished,
          heading: 'All Done!',
          payload: {
            /* TODO: Final Balances */
          },
        })
      } else {
        this._currentTxIndex = nextTxIndex
      }
    }
    return outcomes
  }

  reset() {
    this._currentTxIndex = -1
    this._customerAccounts = resolveAccountsMap(this._initialCustomerAccounts)
  }
}
