import { addLeadingZeroes } from '../../src/utils'

describe('Utility `addLeadingZeroes` should', () => {
	it('do nothing when string is equal or longer than required length', () => {
		expect(addLeadingZeroes('001', 3)).toBe('001')
		expect(addLeadingZeroes('100', 3)).toBe('100')
		expect(addLeadingZeroes('1024', 2)).toBe('1024')
	})

	it('add leading zeroes when input string is shorter than required length', () => {
		expect(addLeadingZeroes('1', 3)).toBe('001')
		expect(addLeadingZeroes('23', 3)).toBe('023')
	})

	it('accept numbers, as well as strings', () => {
		expect(addLeadingZeroes(1, 3)).toBe('001')
		expect(addLeadingZeroes(1024, 5)).toBe('01024')
	})
})
