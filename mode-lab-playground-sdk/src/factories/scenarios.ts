import { PaymentScenario, AssetsAccount, Tx, Protagonist } from '../datamodel'
import { hyphenate } from '../utils'

export const createPaymentScenario = (
	title: string,
	protagonist: Protagonist,
	description: string,
	accounts: AssetsAccount[],
	paymentTxs: Tx[]
): PaymentScenario => {
	const slug = hyphenate(`${protagonist} ${title}`)
	return {
		id: slug,
		title,
		slug: slug,
		protagonist,
		description,
		accounts,
		paymentTxs,
	}
}
