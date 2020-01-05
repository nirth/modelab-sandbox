import uuid from 'uuid'
import { txFactory } from './utils'
import { Scenario, TxType } from '../../datamodel/core'

const createSalary = txFactory({
  type: TxType.Payment,
  datetime: '2020-01-10T06:30:00.500Z',
  amount: '3500.00',
  orderingCustomer: 'Acme Corm',
  orderingBankAccount: '121212',
  sender: 'BankyBank',
  receiver: 'Mode',
  beneficiaryCustomer: 'Alice',
  beneficiaryBankAccount: '343434',
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
