type Value = string | number | boolean | any
type KeyValuePair = [string, Value]

type TableRow = {
	[key: string]: Value
}

type Table = TableRow[]

const capitalizeWord = (word: string): string =>
	word
		.toLowerCase()
		.split('')
		.map((letter: string, index: number) => (index === 0 ? letter.toUpperCase() : letter))
		.join('')

const capitalize = (key: string): string =>
	key
		.split(' ')
		.map((word: string, index: number) => (index === 0 ? word.toLowerCase() : capitalizeWord(word)))
		.join('')

const addKeyValue = (tableRow: TableRow, kv: KeyValuePair) => {
	const [key, value] = kv
	tableRow[key] = value
	return tableRow
}

export const toPascalCasedTableRow = (tableRow: TableRow) =>
	Object.entries(tableRow)
		.map(([key, value]): KeyValuePair => [capitalize(key), value])
		.reduce(addKeyValue, {})

export const toPascalCasedTable = (table: Table) => table.map(toPascalCasedTableRow)
