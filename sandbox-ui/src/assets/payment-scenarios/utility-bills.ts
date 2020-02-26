import uuid from 'uuid'
import { txFactory } from './utils'
import {
  DirectDebitAnnouncementTx,
  DirectDebitPaymentTx,
  Scenario,
  TxFactory,
  TxType,
} from '../../sbdk/datamodel'
import { padNumber } from '../../utils'

const directDebitAnnouncement: TxFactory<DirectDebitAnnouncementTx> = txFactory(
  {
    type: TxType.DirectDebitAnnouncement,
    datetime: '2020-01-05T06:30:00.500Z',
    amount: '100',
    creditorCustomer: 'Claus Water and Electricity',
    creditorBankAccount: '999999',
    sender: 'Banky Bank',
    receiver: 'Mode',
    debitorCustomer: 'Alice',
    debitorBankAccount: '1100001',
  }
)

const directDebitPayment: TxFactory<DirectDebitPaymentTx> = txFactory({
  type: TxType.DirectDebitPayment,
  datetime: '2020-01-16T06:30:00.500Z',
  amount: '100',
  creditorCustomer: 'Claus Water and Electricity',
  creditorBankAccount: '999999',
  sender: 'Banky Bank',
  receiver: 'Mode',
  debitorCustomer: 'Alice',
  debitorBankAccount: '1100001',
})

export const utilityBills: Scenario = {
  id: uuid.v4(),
  slug: 'utility-bills',
  title: 'Utility Bills',
  description: 'Scenario where our customer pays her bills every month',
  txs: Array.from({ length: 12 })
    .map((_, index) => index + 1)
    .map((month: number) => {
      const stringMonth = padNumber(month)

      const announcement = directDebitAnnouncement({
        datetime: `2020-${stringMonth}-05T06:30:00.500Z`,
      })
      const payment = directDebitPayment({
        datetime: `2020-${stringMonth}-16T06:30:00.500Z`,
      })
      return [announcement, payment]
    })
    .reduce(
      (allPayments, monthlyPayments) => allPayments.concat(monthlyPayments),
      []
    ),
}

export { utilityBills as scenario }
