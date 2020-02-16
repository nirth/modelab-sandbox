import { Scenario, Scenarios, Tx, TxFactory } from '../../sbdk/datamodel'
import uuid from 'uuid'

export const txFactory = (defaultValues: Tx): any => (overrides: any): any => ({
  ...defaultValues,
  ...overrides,
})

const sortTxsByDate = (a: Tx, b: Tx) => {
  const dateA = new Date(a.datetime)
  const dateB = new Date(b.datetime)

  return dateA.valueOf() - dateB.valueOf()
}

export const composeScenarios = (
  title: string,
  slug: string,
  description: string,
  scenarios: Scenarios
): Scenario => {
  const txs: Tx[] = scenarios
    .reduce(
      (nextTxs: Tx[], scenario: Scenario) => nextTxs.concat(scenario.txs),
      []
    )
    .sort(sortTxsByDate)

  return { id: uuid.v4(), slug, title, description, txs }
}
