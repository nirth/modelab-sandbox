import { PaymentScenario, AssetsAccount, Tx, Protagonist } from '../datamodel'
import { hyphenate, sortTxsByDate } from '../utils'

export const createPaymentScenario = (
	title: string,
	protagonist: Protagonist,
	description: string,
	txs: Tx[]
): PaymentScenario => {
	const slug = hyphenate(`${protagonist} ${title}`)
	const sortedTxs = txs.sort(sortTxsByDate)
	return {
		id: slug,
		title,
		slug: slug,
		protagonist,
		description,
		txs: sortedTxs,
	}
}
