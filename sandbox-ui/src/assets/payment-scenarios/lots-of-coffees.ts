import uuid from 'uuid'
import { txFactory } from './utils'
import { Scenario, TxType } from '../../datamodel/core'
import { padNumber } from '../../utils'

const payForCoffee = txFactory({
  type: TxType.Payment,
  datetime: '2020-01-10T06:30:00.500Z',
  amount: '2.80',
  orderingCustomer: 'Alice',
  orderingBankAccount: '343434',
  sender: 'Mode',
  receiver: 'Banky Bank',
  beneficiaryCustomer: 'Boozy Coffees',
  beneficiaryBankAccount: '454545',
})

export const lotsOfCoffees: Scenario = {
  id: uuid.v4(),
  slug: 'lots-of-coffees',
  title: 'Lots of Coffees',
  description: 'Simple scenario where Alice is buying a lot of coffees',
  txs: Array.from({ length: 240 }).map((_: any, index: number) => {
    const month = index === 0 ? 1 : Math.ceil(index / 20)
    const day = index - (month - 1) * 20
    const stringMonth = padNumber(month)
    const stringDay = padNumber(day)
    const datetime = `2020-${stringMonth}-${stringDay}T06:30:00.500Z`

    return payForCoffee({ datetime })
  }),
}

export { lotsOfCoffees as scenario }
