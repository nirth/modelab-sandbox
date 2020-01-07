import uuid from 'uuid'
import { txFactory } from './utils'
import { Scenario, TxType } from '../../datamodel/core'

const directDebitAnnouncement = txFactory({
  type: TxType.DirectDebitAnnouncement,
  datetime: '2020-01-05T06:30:00.500Z',
  amount: '600',
  creditorCustomer: 'Claus Water and Electricity',
  creditorBankAccount: '999999',
  sender: 'Banky Bank',
  receiver: 'Mode',
  debitorCustomer: 'Alice',
  debitorBankAccount: '343434',
})

const directDebitPayment = txFactory({
  type: TxType.DirectDebitPayment,
  datetime: '2020-01-16T06:30:00.500Z',
  amount: '600',
  creditorCustomer: 'Claus Water and Electricity',
  creditorBankAccount: '999999',
  sender: 'Banky Bank',
  receiver: 'Mode',
  debitorCustomer: 'Alice',
  debitorBankAccount: '343434',
})

export const coupleOfLargeDds: Scenario = {
  id: uuid.v4(),
  slug: 'utility-bills',
  title: 'Utility Bills',
  description: 'Scenario where our customer pays her bills every month',
  txs: [
    directDebitAnnouncement({ datetime: '2020-02-03T06:30:00.500Z' }),
    directDebitPayment({ datetime: '2020-02-14T06:30:00.500Z' }),
    directDebitAnnouncement({ datetime: '2020-04-03T06:30:00.500Z' }),
    directDebitPayment({ datetime: '2020-04-14T06:30:00.500Z' }),
  ],
}

export { coupleOfLargeDds as scenario }
