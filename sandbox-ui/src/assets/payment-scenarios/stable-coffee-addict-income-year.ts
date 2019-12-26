import uuid from 'uuid'
import { paymentFactory } from './factories'
import { Scenario } from '../../datamodel/core'

const createSalary = paymentFactory({
  datetime: '2019-01-10T06:30:00.500Z',
  amount: '3500.00',
  orderingCustomer: 'Acme Corm',
  orderingBankAccount: '121212',
  sender: 'BankyBank',
  receiver: 'Mode',
  beneficiaryCustomer: 'Alice',
  beneficiaryBankAccount: '343434',
})

export const stableCoffeeAddictIncomeYearScenario: Scenario = {
  id: uuid.v4(),
  slug: 'stable-coffee-addict-income-year',
  title: 'Stable coffee addict income for a year',
  description:
    'Simple scenario where our customer is receiving salary every month, and drinks tons of coffee',
  payments: [
    createSalary({ datetime: '2019-01-10T06:30:00.500Z' }),
    createSalary({ datetime: '2019-02-10T06:30:00.500Z' }),
    createSalary({ datetime: '2019-03-10T06:30:00.500Z' }),
    createSalary({ datetime: '2019-04-10T06:30:00.500Z' }),
    createSalary({ datetime: '2019-05-10T06:30:00.500Z' }),
    createSalary({ datetime: '2019-06-10T06:30:00.500Z' }),
    createSalary({ datetime: '2019-07-10T06:30:00.500Z' }),
    createSalary({ datetime: '2019-08-10T06:30:00.500Z' }),
    createSalary({ datetime: '2019-09-10T06:30:00.500Z' }),
    createSalary({ datetime: '2019-10-10T06:30:00.500Z' }),
    createSalary({ datetime: '2019-11-10T06:30:00.500Z' }),
    createSalary({ datetime: '2019-12-10T06:30:00.500Z' }),
  ],
}
