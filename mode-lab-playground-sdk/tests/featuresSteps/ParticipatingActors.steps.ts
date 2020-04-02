import { defineFeature, loadFeature } from 'jest-cucumber'
import { toPascalCasedTable } from './utils'
import { createAccount } from '../../src/factories/accounts'
import { createProtagonist } from '../../src/factories/actors'
import { AssetsAccount, Protagonist } from '../../src/datamodel'
import { toNormalizedAccounts } from '../../src/utils'

const feature = loadFeature('./tests/features/ParticipatingActors.feature')

defineFeature(feature, (test) => {
	test('Create Protagonist – Alice with her bank and crypto accounts', ({ given, when, then }) => {
		let protagonistDescription: any
		let accountsDescriptions: any
		let actualProtagonist: Protagonist

		given('protagonist Alice:', (table) => {
			protagonistDescription = toPascalCasedTable(table).shift()
		})

		given('her bank accounts and crypto wallets:', (table) => {
			accountsDescriptions = toPascalCasedTable(table)
		})

		when('we create our protagonist', () => {
			actualProtagonist = createProtagonist(
				protagonistDescription.name,
				accountsDescriptions.map(
					({ assetKind, name, accountNumberOrAddress, currencyCode }: any) => {
						return createAccount(assetKind, name, accountNumberOrAddress, '0', currencyCode)
					}
				)
			)
		})

		then('we expect to see our protagonist Alice with following accounts:', (table) => {
			const expectedProtagonist: Protagonist = {
				name: 'Alice',
				accounts: toNormalizedAccounts(toPascalCasedTable(table) as AssetsAccount[]),
			}

			expect(actualProtagonist.name).toBe(expectedProtagonist.name)

			Object.values(actualProtagonist.accounts).forEach((actual: AssetsAccount) => {
				const expected: AssetsAccount = expectedProtagonist.accounts[actual.paymentInstrument]

				expect(actual.assetKind).toBe(expected.assetKind)
				expect(actual.balance).toBe(expected.balance)
				expect(actual.ccy).toBe(expected.ccy)
				expect(actual.ccyCode).toBe(expected.ccyCode)
			})
		})
	})
})
