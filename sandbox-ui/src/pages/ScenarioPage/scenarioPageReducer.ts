// import { TxType, Tx } from '../../sbdk/datamodel'
import { ScenarioPlayer } from '../../sbdk/ScenarioPlayer'
import {
  createCashAccount,
  createSecuritiesAccount,
  createBitcoinWallet,
} from '../../../../mode-lab-playground-sdk/src/factories/accounts'
import { ScenarioDisplayState, AccountPurpose } from '../../sbdk/datamodel'
import { notifyOnLargeDirectDebit } from '../../../../mode-lab-playground-sdk/src/banking-apps'

const scenarioPlayer = new ScenarioPlayer([
  createCashAccount(
    'Current Account',
    AccountPurpose.Current,
    '1100001',
    '0',
    'GBP'
  ),
  createCashAccount(
    'Savings Account',
    AccountPurpose.Savings,
    '1100002',
    '0',
    'GBP'
  ),
  createSecuritiesAccount(
    'ISA',
    AccountPurpose.MediumRiskInvestment,
    '1200001',
    '0',
    'GBP'
  ),
  createBitcoinWallet(
    'Bitcoin Wallet',
    AccountPurpose.HighRiskInvestment,
    '123xyz',
    '0',
    'BTC'
  ),
])
scenarioPlayer.bankingAppSourceCode = notifyOnLargeDirectDebit

export const initialScenarioPageState: ScenarioDisplayState = {
  scenarioLoaded: false,
  readyToPlay: false,
  scenarioFinished: false,
  accounts: [],
  bankingAppSourceCode: notifyOnLargeDirectDebit,
  scenarioId: '',
  txIndex: -1,
  txs: [],
  declinedTxs: [],
  settledTxs: [],
  createdTxs: [],
  outcomes: [],
}

export const scenarioPageReducer = (
  state: ScenarioDisplayState,
  { type, payload }
): ScenarioDisplayState => {
  switch (type) {
    case 'ScenarioSelected':
      scenarioPlayer.loadScenario(payload)
      return scenarioPlayer.displayState
    case 'PlayNextTx':
      return scenarioPlayer.playNextTx().displayState
    case 'BankingAppSourceCodeUpdated':
      scenarioPlayer.bankingAppSourceCode = payload.sourceCode
      return scenarioPlayer.displayState
    case 'ResetScenario':
      return scenarioPlayer.reset().displayState
    default:
      return state
  }
}
