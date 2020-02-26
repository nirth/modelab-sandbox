import {
  Account,
  Accounts,
  Scenario,
  Tx,
  TxType,
  Outcome,
  OutcomeKind,
  ScenarioDisplayState,
} from './datamodel'
import { transpileApp } from './banking-apps/transpileApp'
import { isDefinedObject, sortTxsByDate } from '../utils'
import { CompiledApp, Action } from './banking-apps/datamodel'
import { actionToOutcome } from './factories/outcomes'

const resolveAccountsMap = (accounts: Account[]): Accounts =>
  accounts.reduce((accountsMap: Accounts, account: Account) => {
    return {
      ...accountsMap,
      
      [account.paymentInstrument]: account,
    }
  }, {})

export class ScenarioPlayer {
  _accounts: Accounts
  _scenario?: Scenario
  _txs: Tx[]
  _settledTxs: Tx[]
  _declinedTxs: Tx[]
  _createdTxs: Tx[]
  _outcomes: Outcome[]
  _initialCustomerAccounts: any
  _bankingApp?: CompiledApp
  _bankingAppSourceCode
  _shouldRecompileBankingApp
  _currentTxIndex: number

  constructor(initialCustomerAccounts: Account[]) {
    this._initialCustomerAccounts = initialCustomerAccounts.concat()
    this._accounts = resolveAccountsMap(initialCustomerAccounts)
    this._currentTxIndex = -1
    this._txs = []
    this._settledTxs = []
    this._declinedTxs = []
    this._createdTxs = []
    this._outcomes = []
    this._bankingAppSourceCode = ''
    this._shouldRecompileBankingApp = false
  }

  get accounts(): Accounts {
    return { ...this._accounts }
  }

  get bankingAppSourceCode(): string {
    return this._bankingAppSourceCode
  }

  set bankingAppSourceCode(value: string) {
    if (value === this._bankingAppSourceCode) {
      return
    }

    this._bankingAppSourceCode = value
    this._shouldRecompileBankingApp = true
  }

  get scenarioLoaded(): boolean {
    return isDefinedObject(this._accounts) && isDefinedObject(this._scenario)
  }

  get readyToPlay(): boolean {
    return this.scenarioLoaded && typeof this._bankingApp === 'function'
  }

  get scenarioFinished() {
    return this._currentTxIndex === this._txs.length - 1
  }

  get displayState(): ScenarioDisplayState {
    if (typeof this._scenario === 'object' && this._scenario !== null) {
      const allTxs: Tx[] = this._txs
        .concat(this._settledTxs)
        .concat(this._declinedTxs)
        .concat(this._createdTxs)
        .sort(sortTxsByDate)

      return {
        scenarioLoaded: this.scenarioLoaded,
        readyToPlay: this.readyToPlay,
        scenarioFinished: this.scenarioFinished,
        accounts: Object.values(this._accounts),
        bankingAppSourceCode: this.bankingAppSourceCode,
        scenarioId: this._scenario.id,
        txIndex: this._currentTxIndex,
        txs: allTxs,
        settledTxs: this._settledTxs,
        declinedTxs: this._declinedTxs,
        createdTxs: [],
        outcomes: this._outcomes,
      }
    } else {
      return {
        scenarioLoaded: this.scenarioLoaded,
        readyToPlay: this.readyToPlay,
        scenarioFinished: this.scenarioFinished,
        accounts: [],
        bankingAppSourceCode: this.bankingAppSourceCode,
        scenarioId: '',
        txIndex: -1,
        txs: [],
        declinedTxs: [],
        settledTxs: [],
        createdTxs: [],
        outcomes: [],
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

  playNextTx(): ScenarioPlayer {
    const outcomes: Outcome[] = []

    if (this._shouldRecompileBankingApp) {
      this.updateBankingApp()
    }

    if (this._txs.length > 0 && this.readyToPlay) {
      if (!(typeof this._scenario === 'object' && this._scenario !== null)) {
        throw new Error('ScenarioPlayer.play: Scenario is not defined')
      }

      const app = this._bankingApp

      const tx: Tx | undefined = this._txs.shift()

      if (typeof app !== 'function') {
        throw new Error('ScenarioPlayer.play: App is not defined')
      }

      if (tx === undefined) {
        throw new Error('ScenarioPlayer.play: Tx is not defined')
      }

      const [shouldContinueExecution, actions] = app(tx)

      actions.forEach((action: Action) => {
        const maybeOutcome = actionToOutcome(action)
        if (maybeOutcome !== undefined) {
          outcomes.push(maybeOutcome)
        }
      })

      if (shouldContinueExecution) {
        outcomes.push({
          kind: OutcomeKind.Executed,
          heading: 'Payment Executed and Settled',
          body: '',
          payload: {},
        })
        this.executeAndSettlePayment(tx)
        this._settledTxs.push(tx)
      } else {
        outcomes.push({
          kind: OutcomeKind.Declined,
          heading: 'Payment Declined',
          body: `Payment of ${tx.amount} is declined`,
          payload: {},
        })
        this._declinedTxs.push(tx)
      }

      const scenarioWillBeFinished = this._txs.length === 0
      console.log('ScenarioPlayer.play', scenarioWillBeFinished)

      if (scenarioWillBeFinished) {
        outcomes.push({
          kind: OutcomeKind.ScenarioFinished,
          heading: 'All Done!',
          body: '',
          payload: {
            /* TODO: Final Balances */
            /* Or deltas per account */
          },
        })
      }
    }

    this._outcomes = this._outcomes.concat(outcomes)

    return this
  }

  executeAndSettlePayment(tx: Tx) {
    if (tx.type === TxType.DirectDebitAnnouncement) {
      return
    }

    const accounts = Object.values(this._accounts).map(
      ({ paymentInstrument }: Account) => paymentInstrument
    )

    if (accounts.includes(tx.debitorBankAccount)) {
      const debitAccount: Account = this._accounts[tx.debitorBankAccount]
      const nextBalance = (
        parseFloat(debitAccount.balance) - parseFloat(tx.amount)
      ).toString()
      this._accounts[tx.debitorBankAccount] = {
        ...debitAccount,
        balance: nextBalance,
      }
    } else if (accounts.includes(tx.creditorBankAccount)) {
      const creditAccount = this._accounts[tx.creditorBankAccount]
      const nextBalance = (
        parseFloat(creditAccount.balance) + parseFloat(tx.amount)
      ).toString()
      this._accounts[tx.creditorBankAccount] = {
        ...creditAccount,
        balance: nextBalance,
      }
    }
  }

  reset() {
    this._accounts = resolveAccountsMap(this._initialCustomerAccounts)
    this._currentTxIndex = -1
    this._txs = []
    this._settledTxs = []
    this._declinedTxs = []
    this._createdTxs = []
    this._outcomes = []
    this._bankingAppSourceCode = ''
    this._shouldRecompileBankingApp = false

    if (typeof this._scenario === 'object' && this._scenario !== null) {
      this.loadScenario(this._scenario)
    }

    return this
  }

  updateBankingApp() {
    const bankingApp = transpileApp(this._bankingAppSourceCode)

    if (typeof bankingApp === 'function') {
      this._bankingApp = bankingApp
      this._shouldRecompileBankingApp = false
    } else {
      console.error('ScenarioPlayer.updateBankingApp:error')
    }
  }
}
