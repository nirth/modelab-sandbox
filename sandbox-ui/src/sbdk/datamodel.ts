export type HealthStatus = {
  serviceName: string
  serviceId: string
  ok: boolean
  status?: string
  sidecars?: HealthStatus[]
}

export enum TxType {
  DirectDebitPayment = 'DIRECT_DEBIT_PAYMENT',
  DirectDebitAnnouncement = 'DIRECT_DEBIT_ANNOUNCEMENT',
  CreditTransfer = 'CREDIT_TRANSFER',
}

export type Tx = {
  type: TxType
  datetime: string
  amount: string
  creditorCustomer: string
  creditorBankAccount: string
  sender: string
  receiver: string
  debitorCustomer: string
  debitorBankAccount: string
}

export type DirectDebitPaymentTx = Tx & {
  type: TxType.DirectDebitPayment
}

export type DirectDebitAnnouncementTx = Tx & {
  type: TxType.DirectDebitAnnouncement
}

export type CreditTransferTx = Tx & {
  type: TxType.CreditTransfer
}

export type Scenario = {
  id: string
  slug: string
  title: string
  description: string
  txs: Tx[]
}

export type Scenarios = Scenario[]

export type ScenarioDisplayState = {
  scenarioLoaded: boolean
  readyToPlay: boolean
  scenarioId: string
  txIndex: number,
  txs: Tx[]
  declinedTxs: Tx[]
  executedTxs: Tx[]
  createdTxs: Tx[]
}

export type TxFactory<TxType> = (overrides: any) => TxType

export enum AccountKind {
  CurrentAccount = 'CURRENT_ACCOUNT',
  SavingsAccount = 'SAVINGS_ACCOUNT',
  IsaAccount = 'ISA_ACCOUNT',
  LifeIsaAccount = 'LIFE_ISA_ACCOUNT',
  BitcoinWallet = 'BITCOIN_WALLET',
}

export type Account = {
  kind: AccountKind
  name: string
  paymentInstrument: string
  ccy: string
  ccyCode: string
  ccySymbol: string
  balance: string
}

export type Accounts = {
  [ccyCode: string]: Account
}

export enum OutcomeKind {
  Finished = 'FINISHED',
  Executed = 'Executed',
  Declined = 'DECLINED',
}

export type Outcome = {
  kind: OutcomeKind
  heading: string
  payload?: object
}
