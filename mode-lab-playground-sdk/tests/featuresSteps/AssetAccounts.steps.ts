import { defineFeature, loadFeature } from 'jest-cucumber'
import { toPascalCasedTable } from './utils'
import { createAccount } from '../../src/factories/accounts'
import { AssetsAccount, AssetKind } from '../../src/datamodel'

const feature = loadFeature('./tests/features/AssetAccounts.feature')

defineFeature(feature, test => {
	test('Create Cash and Native Crypto accounts', ({ given, when, then }) => {
		let accountDetails: any[] = []
		let actualAccounts: AssetsAccount[] = []

		given('following details about payment accounts that we want to create:', table => {
			accountDetails = toPascalCasedTable(table)
		})

		when('we attempt to create asset accounts', () => {
			actualAccounts = accountDetails.map(
				({ assetKind, name, accountNumberOrAddress, currencyCode }: any) => {
					return createAccount(assetKind, name, accountNumberOrAddress, '0', currencyCode)
				}
			)
		})

		then('we expect to see following model created:', table => {
			const expectedAccounts: AssetsAccount[] = toPascalCasedTable(table) as AssetsAccount[]

			actualAccounts.forEach((actual: AssetsAccount, index: number) => {
				const expected: AssetsAccount = expectedAccounts[index]

				expect(actual.assetKind).toBe(expected.assetKind)
				expect(actual.balance).toBe(expected.balance)
				expect(actual.ccy).toBe(expected.ccy)
				expect(actual.ccyCode).toBe(expected.ccyCode)
			})
		})
	})
})
