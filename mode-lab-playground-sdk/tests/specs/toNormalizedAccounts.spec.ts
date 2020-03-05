import { hyphenate, toNormalizedAccounts } from '../../src/utils'
import { createCashAccount } from '../../src/factories/accounts'

describe('Utility `toNormalizedAccounts` should', () => {
	it('take a list of `AssetsAccount`s and transform them into a map', () => {
		const currentAccount = createCashAccount('Current Account', '10000001', '0', 'GBP')
		const savingsAccount = createCashAccount('Savings Account', '10000002', '0', 'GBP')
		const input = [currentAccount, savingsAccount]

		const expected = {
			'10000001': currentAccount,
			'10000002': savingsAccount,
		}

		const actual = toNormalizedAccounts(input)

		expect(actual).toEqual(expected)
	})
})
