import { defineFeature, loadFeature } from 'jest-cucumber'
import { toPascalCasedTable } from './utils'
import { Tx } from '../../src/datamodel'
import { createMonthlySalary, createDailyPayments } from '../../src/factories/txs'

const feature = loadFeature('./tests/features/RecurringTxs.feature')

defineFeature(feature, test => {
	test('Create set of transactions to simulate monthly salary', ({ given, when, then }) => {
		let txDescription: any = {}
		let firstBatchOfTxs: Tx[] = []
		let secondBatchOfTxs: Tx[] = []

		given('following salary payment details for transaction:', table => {
			txDescription = toPascalCasedTable(table).shift()
		})

		when(
			'converting it into monthy salary payment starting with following from and to dates:',
			table => {
				const fromAndToDates = toPascalCasedTable(table)
				const firstBatch = fromAndToDates[0]
				const secondBatch = fromAndToDates[1]

				firstBatchOfTxs = createMonthlySalary(
					firstBatch.fromDate,
					firstBatch.toDate,
					txDescription.amount,
					txDescription.creditorCustomer,
					txDescription.creditorBankAccount,
					txDescription.sender,
					txDescription.receiver,
					txDescription.debitorCustomer,
					txDescription.debitorBankAccount
				)
				secondBatchOfTxs = createMonthlySalary(
					secondBatch.fromDate,
					secondBatch.toDate,
					txDescription.amount,
					txDescription.creditorCustomer,
					txDescription.creditorBankAccount,
					txDescription.sender,
					txDescription.receiver,
					txDescription.debitorCustomer,
					txDescription.debitorBankAccount
				)
			}
		)

		then('we expect to see following salary payments for first case:', table => {
			const expectedPayments = toPascalCasedTable(table)

			expectedPayments.forEach(
				(
					{
						datetime,
						amount,
						creditorCustomer,
						creditorBankAccount,
						sender,
						receiver,
						debitorCustomer,
						debitorBankAccount,
					},
					index
				) => {
					const actualTx: Tx = firstBatchOfTxs[index]
					expect(datetime).toEqual(actualTx.datetime)
					expect(amount).toEqual(actualTx.amount)
					expect(creditorCustomer).toEqual(actualTx.creditorCustomer)
					expect(creditorBankAccount).toEqual(actualTx.creditorBankAccount)
					expect(sender).toEqual(actualTx.sender)
					expect(receiver).toEqual(actualTx.receiver)
					expect(debitorCustomer).toEqual(actualTx.debitorCustomer)
					expect(debitorBankAccount).toEqual(actualTx.debitorBankAccount)
				}
			)
		})

		then('we expect to see these salary payments for second case:', table => {
			const expectedPayments = toPascalCasedTable(table)

			expectedPayments.forEach(
				(
					{
						datetime,
						amount,
						creditorCustomer,
						creditorBankAccount,
						sender,
						receiver,
						debitorCustomer,
						debitorBankAccount,
					},
					index
				) => {
					const actualTx: Tx = secondBatchOfTxs[index]
					expect(datetime).toEqual(actualTx.datetime)
					expect(amount).toEqual(actualTx.amount)
					expect(creditorCustomer).toEqual(actualTx.creditorCustomer)
					expect(creditorBankAccount).toEqual(actualTx.creditorBankAccount)
					expect(sender).toEqual(actualTx.sender)
					expect(receiver).toEqual(actualTx.receiver)
					expect(debitorCustomer).toEqual(actualTx.debitorCustomer)
					expect(debitorBankAccount).toEqual(actualTx.debitorBankAccount)
				}
			)
		})
	})

	test('Create set of transactions to simulate daily coffee', ({ given, when, then }) => {
		let txDescription: any = {}
		let coffeePayments: Tx[] = []

		given('following details for transaction representing payment for coffee:', table => {
			txDescription = toPascalCasedTable(table).shift()
		})

		when('converting it into daily payment starting with following from and to dates:', table => {
			const fromAndToDates = toPascalCasedTable(table).shift() || {}

			coffeePayments = createDailyPayments(
				fromAndToDates.fromDate,
				fromAndToDates.toDate,
				txDescription.amount,
				txDescription.creditorCustomer,
				txDescription.creditorBankAccount,
				txDescription.sender,
				txDescription.receiver,
				txDescription.debitorCustomer,
				txDescription.debitorBankAccount
			)
		})

		then('we expect to see following payments for coffee:', table => {
			const expectedPayments = toPascalCasedTable(table)

			expectedPayments.forEach(
				(
					{
						datetime,
						amount,
						creditorCustomer,
						creditorBankAccount,
						sender,
						receiver,
						debitorCustomer,
						debitorBankAccount,
					},
					index
				) => {
					const actualTx: Tx = coffeePayments[index]
					expect(datetime).toEqual(actualTx.datetime)
					expect(amount).toEqual(actualTx.amount)
					expect(creditorCustomer).toEqual(actualTx.creditorCustomer)
					expect(creditorBankAccount).toEqual(actualTx.creditorBankAccount)
					expect(sender).toEqual(actualTx.sender)
					expect(receiver).toEqual(actualTx.receiver)
					expect(debitorCustomer).toEqual(actualTx.debitorCustomer)
					expect(debitorBankAccount).toEqual(actualTx.debitorBankAccount)
				}
			)
		})
	})
})
