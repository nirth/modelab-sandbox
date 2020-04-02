import { defineFeature, loadFeature } from 'jest-cucumber'
import { toPascalCasedTable } from './utils'
import { createPaymentScenario } from '../../src/factories'
import { PaymentScenario } from '../../src/datamodel'

const feature = loadFeature('./tests/features/PaymentScenarios.feature')

defineFeature(feature, (test) => {
	test('Create new PaymentScenairo', ({ given, when, then }) => {
		let scenarios: PaymentScenario[] = []

		when('attempting to create PaymentScenarios with following information:', (table) => {
			const scenariosDetails = toPascalCasedTable(table)
			scenarios = scenariosDetails.map(({ title, protagonist }) =>
				createPaymentScenario(title, protagonist, '', [])
			)
		})

		then('we expect PaymentScenarios to be initialized with following informaiton:', (table) => {
			const scenarios = toPascalCasedTable(table) as PaymentScenario[]

			scenarios.forEach((expectedScenarioDetails: any, index: number) => {
				const actualScenario: PaymentScenario = scenarios[index]

				expect(actualScenario.id).toBe(expectedScenarioDetails.id)
				expect(actualScenario.title).toBe(expectedScenarioDetails.title)
				expect(actualScenario.protagonist).toBe(expectedScenarioDetails.protagonist)
				expect(actualScenario.slug).toBe(expectedScenarioDetails.slug)
			})
		})
	})
})
