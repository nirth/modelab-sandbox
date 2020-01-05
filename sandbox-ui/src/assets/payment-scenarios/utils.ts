import { Scenario, Scenarios, Tx } from '../../datamodel/core'
import uuid from 'uuid'

export const txFactory = (payload: Tx) => (overrides: any): Tx => {
  return { ...payload, ...overrides }
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
    .sort((a: Tx, b: Tx) => {
      const dateA = new Date(a.datetime)
      const dateB = new Date(b.datetime)

      return dateA.valueOf() - dateB.valueOf()
    })

  return { id: uuid.v4(), slug, title, description, txs }
}
