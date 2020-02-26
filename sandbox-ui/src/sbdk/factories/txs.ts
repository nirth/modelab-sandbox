import {
  DirectDebitAnnouncementTx,
  DirectDebitPaymentTx,
  TxType,
  CreditTransferTx,
} from '../datamodel'
import { fromString as uuidFromString } from 'uuidv4'

export const createTxId = (
  type: TxType,
  datetime: string,
  creditorBankAccount: string,
  debitorBankAccount: string,
  amount: string
): string => {
  console.log(
    `createTxId(${type}, ${datetime}, ${creditorBankAccount}, ${debitorBankAccount}, ${amount}`,
    uuidFromString(
      type + datetime + creditorBankAccount + debitorBankAccount + amount
    )
  )
  return uuidFromString(
    type + datetime + creditorBankAccount + debitorBankAccount + amount
  )
}

const createTx = (
  type: TxType,
  datetime: string,
  amount: string,
  creditorCustomer: string,
  creditorBankAccount: string,
  sender: string,
  receiver: string,
  debitorCustomer: string,
  debitorBankAccount: string
): any => ({
  id: createTxId(
    type,
    datetime,
    creditorBankAccount,
    debitorBankAccount,
    amount
  ),
  type,
  datetime,
  amount,
  creditorCustomer,
  creditorBankAccount,
  sender,
  receiver,
  debitorCustomer,
  debitorBankAccount,
})

export const createCreditTransferTx = (
  datetime: string,
  amount: string,
  creditorCustomer: string,
  creditorBankAccount: string,
  sender: string,
  receiver: string,
  debitorCustomer: string,
  debitorBankAccount: string
): CreditTransferTx =>
  createTx(
    TxType.CreditTransfer,
    datetime,
    amount,
    creditorCustomer,
    creditorBankAccount,
    sender,
    receiver,
    debitorCustomer,
    debitorBankAccount
  )

export const createDirectDebitAnnouncementTx = (
  datetime: string,
  amount: string,
  creditorCustomer: string,
  creditorBankAccount: string,
  sender: string,
  receiver: string,
  debitorCustomer: string,
  debitorBankAccount: string
): DirectDebitAnnouncementTx =>
  createTx(
    TxType.DirectDebitAnnouncement,
    datetime,
    amount,
    creditorCustomer,
    creditorBankAccount,
    sender,
    receiver,
    debitorCustomer,
    debitorBankAccount
  )

export const createDirectDebitPaymentTx = (
  datetime: string,
  amount: string,
  creditorCustomer: string,
  creditorBankAccount: string,
  sender: string,
  receiver: string,
  debitorCustomer: string,
  debitorBankAccount: string
): DirectDebitPaymentTx =>
  createTx(
    TxType.DirectDebitPayment,
    datetime,
    amount,
    creditorCustomer,
    creditorBankAccount,
    sender,
    receiver,
    debitorCustomer,
    debitorBankAccount
  )
