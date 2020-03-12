import { Tx } from '../datamodel'

export const sortTxsByDate = (a: Tx, b: Tx) => {
	const dateA = new Date(a.datetime)
	const dateB = new Date(b.datetime)

	return dateA.valueOf() - dateB.valueOf()
}
