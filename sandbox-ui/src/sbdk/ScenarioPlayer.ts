import {
  Account,
  Accounts,
  Scenario,
  Tx,
  Outcome,
  OutcomeKind,
  ScenarioDisplayState,
} from './datamodel'
import { transpileApp } from './banking-apps/transpileApp'
import { CompiledApp } from '../datamodel/marketplace'
import { isDefinedObject } from '../utils'

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
    this._initialCustomerAccounts = initialCustomerAccounts.concat()
    this._customerAccounts = resolveAccountsMap(initialCustomerAccounts)
    this._currentTxIndex = -1
    this._txs = []

    this.reset()
  }

  get balances(): Accounts {
    return { ...this._customerAccounts }
  }

  get scenarioLoaded(): boolean {
    return (
      isDefinedObject(this._customerAccounts) &&
      isDefinedObject(this._scenario)
    )
  }

  get readyToPlay(): boolean {
    return (
      this.scenarioLoaded && 
      typeof this._bankingApp === 'function'
    )
  }

  get displayState(): ScenarioDisplayState {
    if (typeof this._scenario === 'object' && this._scenario !== null) {
      return {
        scenarioLoaded: this.scenarioLoaded,
        readyToPlay: this.readyToPlay,
        scenarioId: this._scenario.id,
        txIndex: this._currentTxIndex,
        txs: this._txs,
        declinedTxs: [],
        executedTxs: [],
        createdTxs: [],
      }
    } else {
      return {
        scenarioLoaded: this.scenarioLoaded,
        readyToPlay: this.readyToPlay,
        scenarioId: '',
        txIndex: -1,
        txs: [],
        declinedTxs: [],
        executedTxs: [],
        createdTxs: [],
      }
    }
    
  }

  loadScenario(scenario: Scenario) {
    this.unloadScenario()
    this._scenario = scenario
    this._txs = scenario.txs.concat([])
    this._currentTxIndex = -1
  }

  unloadScenario() {
    this._scenario = undefined
    this._txs = []
    this._currentTxIndex = -1
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

      console.log('actions:', actions)

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
  }
}
