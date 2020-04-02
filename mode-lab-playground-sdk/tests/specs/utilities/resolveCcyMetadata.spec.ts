import { resolveCcyMetadata } from '../../../src/utils'

describe('Utilify `resolveCcyMetadata` should', () => {
	it('successfuly resolve metadata for known currency', () => {
		const currencies: { [ccyCode: string]: string[] } = {
			GBP: ['GBP', 'British Pound', '£'],
			EUR: ['EUR', 'Euro', '€'],
			BTC: ['BTC', 'Bitcoin', '₿'],
		}
		Object.entries(currencies).forEach(([ccyCode, expected]: any) => {
			const actual = resolveCcyMetadata(ccyCode)

			expect(actual).toEqual(expected)
		})
	})

	it('throw error when currency is uknown', () => {
		const currencies = ['ABC', 'XYZ', 'FOO', 'BAR']

		currencies.forEach((unknownCcyCode: any) => {
			expect(() => resolveCcyMetadata(unknownCcyCode)).toThrowError(
				`Unable to resolve currency for code ${unknownCcyCode}`
			)
		})
	})
})
