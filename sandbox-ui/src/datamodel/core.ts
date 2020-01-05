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
  Payment = 'PAYMENT',
}

export type Tx = DirectDebitAnnouncementTx | DirectDebitPaymentTx | PaymentTx

export type DirectDebitPaymentTx = {
  type: TxType.DirectDebitPayment
  datetime: string
  amount: string
  creditorCustomer: string
  creditorBankAccount: string
  sender: string
  receiver: string
  debitorCustomer: string
  debitorBankAccount: string
}

export type DirectDebitAnnouncementTx = {
  type: TxType.DirectDebitAnnouncement
  datetime: string
  amount: string
  creditorCustomer: string
  creditorBankAccount: string
  sender: string
  receiver: string
  debitorCustomer: string
  debitorBankAccount: string
}

export type PaymentTx = {
  type: TxType.Payment
  datetime: string
  amount: string
  orderingCustomer: string
  orderingBankAccount: string
  sender: string
  receiver: string
  beneficiaryCustomer: string
  beneficiaryBankAccount: string
}

export type Scenario = {
  id: string
  slug: string
  title: string
  description: string
  txs: Tx[]
}

export type Scenarios = Scenario[]
