import { computeMonths } from '../../src/utils'

describe('Utility `computeMonths` should', () => {
	it('be able to take create list of months between two dates', () => {
		expect(['2020-01-01', '2020-02-01', '2020-03-01']).toEqual(
			computeMonths('2020-01-01', '2020-03-01')
		)
		expect([
			'2020-01-11',
			'2020-02-11',
			'2020-03-11',
			'2020-04-11',
			'2020-05-11',
			'2020-06-11',
		]).toEqual(computeMonths('2020-01-11', '2020-06-11'))
		expect([
			'2020-07-23',
			'2020-08-23',
			'2020-09-23',
			'2020-10-23',
			'2020-11-23',
			'2020-12-23',
		]).toEqual(computeMonths('2020-07-23', '2020-12-23'))
	})

	it('be able to reset (re-modulize) month if they exceed the given year', () => {
		expect([
			'2020-10-16',
			'2020-11-16',
			'2020-12-16',
			'2021-01-16',
			'2021-02-16',
			'2021-03-16',
		]).toEqual(computeMonths('2020-10-16', '2021-03-16'))
	})
})
