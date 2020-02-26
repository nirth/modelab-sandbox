import uuid from 'uuid'
import { txFactory } from './utils'
import {
  Scenario,
  TxType,
  TxFactory,
  CreditTransferTx,
} from '../../sbdk/datamodel'

const createSalary: TxFactory<CreditTransferTx> = txFactory({
  type: TxType.CreditTransfer,
  datetime: '2020-01-10T06:30:00.500Z',
  amount: '3500.00',
  debitorCustomer: 'Acme Corm',
  debitorBankAccount: '121212',
  sender: 'BankyBank',
  receiver: 'Mode',
  creditorCustomer: 'Alice',
  creditorBankAccount: '1100001',
})

export const stableSalary: Scenario = {
  id: uuid.v4(),
  slug: 'stable-salary',
  title: 'Stable Salary',
  description:
    'Simple scenario where our customer is receiving salary every month, and drinks tons of coffee',
  txs: [
    createSalary({ datetime: '2020-01-10T06:30:00.500Z' }),
    createSalary({ datetime: '2020-02-10T06:30:00.500Z' }),
    createSalary({ datetime: '2020-03-10T06:30:00.500Z' }),
    createSalary({ datetime: '2020-04-10T06:30:00.500Z' }),
    createSalary({ datetime: '2020-05-10T06:30:00.500Z' }),
    createSalary({ datetime: '2020-06-10T06:30:00.500Z' }),
    createSalary({ datetime: '2020-07-10T06:30:00.500Z' }),
    createSalary({ datetime: '2020-08-10T06:30:00.500Z' }),
    createSalary({ datetime: '2020-09-10T06:30:00.500Z' }),
    createSalary({ datetime: '2020-10-10T06:30:00.500Z' }),
    createSalary({ datetime: '2020-11-10T06:30:00.500Z' }),
    createSalary({ datetime: '2020-12-10T06:30:00.500Z' }),
  ],
}

export { stableSalary as scenario }
