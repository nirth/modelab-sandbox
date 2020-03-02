import { PaymentScenario, Account, Tx } from '../datamodel'
import { hyphenate } from '../utils'

export const createPaymentScenario = (
	title: string,
	protagonist: string,
	description: string,
	accounts: Account[],
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
