import { safeStringify } from './safeStringify'

export const computePotentiallyAlternatingAmount = (
	amount: string | string[],
	index: number
): string => {
	if (typeof amount === 'string') {
		return amount
	} else if (Array.isArray(amount)) {
		const turn = index % amount.length
		return amount[turn]
	} else {
		throw new Error(`
		computePotentiallyAlternatingAmount: Unexpected amount value:
		${safeStringify(amount)}`)
	}
}
