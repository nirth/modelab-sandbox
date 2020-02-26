// import { TxType, Tx } from '../../sbdk/datamodel'
import { ScenarioPlayer } from '../../sbdk/ScenarioPlayer'
import {
  createCashAccount,
  createSecuritiesAccount,
  createBitcoinWallet,
} from '../../sbdk/factories/accounts'
import { ScenarioDisplayState } from '../../sbdk/datamodel'
import { notifyOnLargeDirectDebit } from '../../sbdk/banking-apps'

const scenarioPlayer = new ScenarioPlayer([
  createCashAccount('UK Current Account', '1100001', '0', 'GBP'),
  createSecuritiesAccount('ISA', '1200001', '0', 'GBP'),
  createBitcoinWallet('Bitcoin Wallet', '123xyz', '0', 'BTC'),
])
scenarioPlayer.bankingAppSourceCode = notifyOnLargeDirectDebit

export const initialScenarioPageState: ScenarioDisplayState = {
  accounts: [],
  scenarioLoaded: false,
  readyToPlay: false,
  bankingAppSourceCode: notifyOnLargeDirectDebit,
  scenarioId: '',
  txIndex: -1,
  txs: [],
  declinedTxs: [],
  executedTxs: [],
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
