// import { TxType, Tx } from '../../sbdk/datamodel'
import { ScenarioPlayer } from '../../sbdk/ScenarioPlayer'
import { createCurrentAccount } from '../../sbdk/factories/accounts'
import { ScenarioDisplayState } from '../../sbdk/datamodel'

// const computeBalance = (balance: number, tx: Tx): number => {
//   if (tx.type === TxType.DirectDebitPayment) {
//     return balance - parseFloat(tx.amount)
//   } else if (tx.type === TxType.CreditTransfer) {
//     return balance + parseFloat(tx.amount)
//   }
//   return balance
// }

const scenarioPlayer = new ScenarioPlayer([
  createCurrentAccount('UK Current Account', '343434', '0', 'GBP'),
  createCurrentAccount('German Current Account', '121212', '0', 'EUR')
])

export const initialScenarioPageState: ScenarioDisplayState = {
  scenarioLoaded: false,
  readyToPlay: false,
  scenarioId: '',
  txIndex: -1,
  txs: [],
  declinedTxs: [],
  executedTxs: [],
  createdTxs: [],
}

export const scenarioPageReducer = (state: ScenarioDisplayState, { type, payload }): ScenarioDisplayState => {
  switch (type) {
    case 'ScenarioSelected':
      console.log('ScenarioSelected', payload)
      scenarioPlayer.loadScenario(payload)
      const {scenarioLoaded, readyToPlay, scenarioId, txIndex, txs, declinedTxs, executedTxs, createdTxs} = scenarioPlayer.displayState
      console.log('ScenarioSelected', payload)
      console.log('ScenarioSelected:displayState', scenarioPlayer.displayState)
      return {scenarioLoaded, readyToPlay, scenarioId, txIndex, txs, declinedTxs, executedTxs, createdTxs}
    default:
      return state
  }
}
