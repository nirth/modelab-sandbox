import { hyphenate } from '../../src/utils'

describe('Utility `hyphenate` should', () => {
	it('hyphenate strings', () => {
		const expectedAndInputs = {
			['hello-world']: 'Hello World',
			['ho-ho-ho']: 'Ho Ho Ho',
			['i-love-you']: 'I love you',
		}

		Object.entries(expectedAndInputs).forEach(([expected, input]) => {
			const actual = hyphenate(input)
			expect(actual).toBe(expected)
		})
	})

	it('remove unallowed characters', () => {
		const expectedAndInputs = {
			['hello-world']: 'Hello World!',
			['ho-ho-ho']: '“Ho Ho Ho”',
			['id-love-to-meet-you']: 'I’d love to meet you?!',
		}

		Object.entries(expectedAndInputs).forEach(([expected, input]) => {
			const actual = hyphenate(input)
			expect(actual).toBe(expected)
		})
	})
})
