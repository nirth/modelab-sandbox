import { computePotentiallyAlternatingAmount } from '../../../src/utils'
describe('Utility computePotentiallyAlternatingAmount should', () => {
	it('return actual value when string is passed', () => {
		const expected = '3000'
		const actual = computePotentiallyAlternatingAmount(expected, 0)

		expect(actual).toBe(expected)
	})

	it('return alternating results when two or more amounts passed', () => {
		const amounts = ['2000', '3000', '4000']
		const expecteds = ['2000', '3000', '4000', '2000', '3000', '4000', '2000', '3000']

		expecteds.forEach((expected: string, index: number) => {
			expect(expected).toBe(computePotentiallyAlternatingAmount(amounts, index))
		})
	})
})
