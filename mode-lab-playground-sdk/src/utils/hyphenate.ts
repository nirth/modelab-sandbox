const allowedCharacters: string[] = '-0123456789abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split(
	''
)

export const hyphenate = (s: string): string =>
	s
		.toLowerCase()
		.split(' ')
		.join('-')
		.split('')
		.filter((symbol): boolean => allowedCharacters.includes(symbol))
		.join('')
