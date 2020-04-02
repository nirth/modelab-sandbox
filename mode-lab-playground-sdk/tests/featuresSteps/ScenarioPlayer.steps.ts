import { defineFeature, loadFeature } from 'jest-cucumber'
import { toPascalCasedTable } from './utils'
import {
	createProtagonist,
	createPaymentScenario,
	createAccount,
	createCreditTransferTx,
	createDirectDebitAnnouncementAndPaymentTxs,
} from '../../src/factories'
import { PaymentScenario, Tx, AssetKind } from '../../src/datamodel'
import { ScenarioPlayer } from '../../src/ScenarioPlayer'

const feature = loadFeature('./tests/features/ScenarioPlayer.feature')

defineFeature(feature, (test) => {
	test('ScenarioPlayer should detect start and end dates', ({ given, when, then }) => {
		let paymentScenairo: PaymentScenario
		let scenarioPlayer: ScenarioPlayer
		let txs: Tx[]

		given('following Txs:', (table) => {
			txs = toPascalCasedTable(table) as Tx[]
		})

		when('we create PaymentScenario', () => {
			paymentScenairo = createPaymentScenario(
				'Super Duper Scenario',
				createProtagonist('Alice', [
					createAccount(AssetKind.Cash, 'CurrentAccount', '100001', '0', 'GBP'),
				]),
				'A little bit over a year',
				txs
			)

			scenarioPlayer = new ScenarioPlayer(paymentScenairo)
		})

		then('we expect it to derive start and end dates as following:', (table) => {
			const [{ startDate, endDate }] = toPascalCasedTable(table)

			expect(scenarioPlayer.startDate).toBe(startDate)
			expect(scenarioPlayer.endDate).toBe(endDate)
		})
	})

	test('ScenarioPlayer should invoke events when executed', ({ given, when, then }) => {
		let paymentScenairo: PaymentScenario
		let scenarioPlayer: ScenarioPlayer
		let txs: Tx[]

		given('following Txs:', (table) => {
			txs = toPascalCasedTable(table).map(
				(txDescriptor): Tx =>
					createCreditTransferTx(
						txDescriptor.datetime,
						txDescriptor.amount,
						txDescriptor.creditorCustomer,
						txDescriptor.creditorBankAccount,
						txDescriptor.sender,
						txDescriptor.receiver,
						txDescriptor.debitorCustomer,
						txDescriptor.debitorBankAccount
					)
			)
		})

		when('we create PaymentScenario', () => {
			paymentScenairo = createPaymentScenario(
				'Super Duper Scenario',
				createProtagonist('Alice', [
					createAccount(AssetKind.Cash, 'CurrentAccount', '100001', '0', 'GBP'),
				]),
				'A little bit over a year',
				txs
			)

			scenarioPlayer = new ScenarioPlayer(paymentScenairo)
		})

		then('we expect following events to be triggered:', (table) => {
			const expectedEvents = toPascalCasedTable(table)

			expectedEvents.forEach(({ eventType, datetime }) => {
				const { event: actual } = scenarioPlayer.next()

				expect(actual).toStrictEqual({ type: eventType, datetime })
			})
		})
	})

	test('ScenarioPlayer should invoke different Tx related events when executed', ({
		given,
		when,
		then,
	}) => {
		let paymentScenairo: PaymentScenario
		let scenarioPlayer: ScenarioPlayer
		let txs: Tx[] = []

		given('following Salary Payments:', (table) => {
			txs = txs.concat(
				toPascalCasedTable(table).map(
					(txDescriptor): Tx =>
						createCreditTransferTx(
							txDescriptor.datetime,
							txDescriptor.amount,
							txDescriptor.creditorCustomer,
							txDescriptor.creditorBankAccount,
							txDescriptor.sender,
							txDescriptor.receiver,
							txDescriptor.debitorCustomer,
							txDescriptor.debitorBankAccount
						)
				)
			)
		})

		given('following Direct Debits:', (table) => {
			txs = txs.concat(
				toPascalCasedTable(table)
					.map((tx): Tx[] =>
						createDirectDebitAnnouncementAndPaymentTxs(
							tx.datetime,
							tx.amount,
							tx.creditorCustomer,
							tx.creditorBankAccount,
							tx.sender,
							tx.receiver,
							tx.debitorCustomer,
							tx.debitorBankAccount
						)
					)
					.reduce((mergedTxs: Tx[], txs: Tx[]) => mergedTxs.concat(txs), [])
			)
		})

		given('following Spending:', (table) => {
			txs = txs.concat(
				toPascalCasedTable(table).map(
					(txDescriptor): Tx =>
						createCreditTransferTx(
							txDescriptor.datetime,
							txDescriptor.amount,
							txDescriptor.creditorCustomer,
							txDescriptor.creditorBankAccount,
							txDescriptor.sender,
							txDescriptor.receiver,
							txDescriptor.debitorCustomer,
							txDescriptor.debitorBankAccount
						)
				)
			)
		})

		when('we create PaymentScenario', () => {
			paymentScenairo = createPaymentScenario(
				'Super Duper Scenario',
				createProtagonist('Alice', [
					createAccount(AssetKind.Cash, 'CurrentAccount', '100001', '0', 'GBP'),
				]),
				'A little bit over a year',
				txs
			)

			scenarioPlayer = new ScenarioPlayer(paymentScenairo)
		})

		then('we expect it to derive start and end dates as following:', (table) => {
			const [{ startDate, endDate }] = toPascalCasedTable(table)

			expect(scenarioPlayer.startDate).toBe(startDate)
			expect(scenarioPlayer.endDate).toBe(endDate)
		})

		then('we expect following events to be triggered:', (table) => {
			const expectedEvents = toPascalCasedTable(table)

			expect(scenarioPlayer.numEvents).toBe(expectedEvents.length)

			expectedEvents.forEach(({ eventType, datetime }) => {
				const { event: actualEvent } = scenarioPlayer.next()

				expect({ eventType: actualEvent.type, datetime: actualEvent.datetime }).toStrictEqual({
					eventType,
					datetime,
				})
			})
		})
	})
})
