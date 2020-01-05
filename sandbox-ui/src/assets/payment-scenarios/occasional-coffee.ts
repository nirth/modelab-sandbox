import uuid from 'uuid'
import { txFactory } from './utils'
import { Scenario, TxType } from '../../datamodel/core'
import { padMonthOrDate } from '../../utils'

const payForCoffee = txFactory({
  type: TxType.Payment,
  datetime: '2020-01-10T06:30:00.500Z',
  amount: '-2.80',
  orderingCustomer: 'Alice',
  orderingBankAccount: '343434',
  sender: 'Mode',
  receiver: 'Banky Bank',
  beneficiaryCustomer: 'Boozy Coffees',
  beneficiaryBankAccount: '454545',
})

export const occasionalCoffee: Scenario = {
  id: uuid.v4(),
  slug: 'occasional-coffee',
  title: 'Occasional Coffee',
  description:
    'Simple scenario where Alice is buying an occasional cup of coffee',
  txs: Array.from({ length: 60 }).map((_: any, index: number) => {
    const month = index === 0 ? 1 : Math.ceil(index / 5)
    const day = index - (month - 1) * 5 + 1
    const stringMonth = padMonthOrDate(month)
    const stringDay = padMonthOrDate(day)
    const datetime = `2020-${stringMonth}-${stringDay}T06:30:00.500Z`

    return payForCoffee({ datetime })
  }),
}

export { occasionalCoffee as scenario }
