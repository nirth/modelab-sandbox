import { Scenario, Scenarios, Tx } from '../../sbdk/datamodel'
import { createTxId } from '../../sbdk/factories/txs'
import { sortTxsByDate } from '../../utils'

export const txFactory = (defaultValues: any): any => (overrides: any): any => {
  const tx: Tx = {
    id: '',
    ...defaultValues,
    ...overrides,
  }

  tx.id = createTxId(
    tx.type,
    tx.datetime,
    tx.creditorBankAccount,
    tx.debitorBankAccount,
    tx.amount
  )

  return tx
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

  return { id: slug, slug, title, description, txs }
}
