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
  id: string
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
  accounts: Account[]
  scenarioLoaded: boolean
  readyToPlay: boolean
  bankingAppSourceCode: string
  scenarioId: string
  txIndex: number
  txs: Tx[]
  declinedTxs: Tx[]
  executedTxs: Tx[]
  createdTxs: Tx[]
  outcomes: Outcome[]
}

export type TxFactory<TxType> = (overrides: any) => TxType

export enum AccountKind {
  CashAccount = 'CASH_ACCOUNT',
  SecuritiesAccount = 'SECURITIES_ACCOUNT',
  BtcWallet = 'BTC_WALLET',
}

export type Account = {
  kind: AccountKind
  name: string
  accountPurpose: string
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
  Notification = 'NOTIFICATION',
  CreateInternalTransfer = 'CREATE_INTERNAL_TRANSFER',
  Executed = 'EXECUTED',
  Declined = 'DECLINED',
  ScenarioFinished = 'SCENARIO_FINISHED',
}

export type Outcome = {
  kind: OutcomeKind
  heading: string
  body: string
  payload: object
}
