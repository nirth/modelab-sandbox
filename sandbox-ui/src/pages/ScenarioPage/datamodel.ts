import { Tx } from '../../sbdk/datamodel'
import { CompiledApp, Action } from '../../datamodel/marketplace'

export type TxDisplayMetadata = {
  isCurrent: boolean
  isDeclined: boolean
  isPastTx: boolean
  isNotification: boolean
  isMoneyIn: boolean
  color: string | number
  tx: Tx
}

export type Balances = {
  currentAccount: number
  savingsAccount: number
  securitiesAccount: number
  bitcoinAccount: number
}

export type ScenarioState = {
  scenarioId: string
  currentTxIndex: number
  declinedTxIndicies: number[]
  txsLoaded: boolean
  txs: Tx[]
  balances: Balances
  appCode: string
  compiledApp: CompiledApp
  outcomes: Action[]
}
