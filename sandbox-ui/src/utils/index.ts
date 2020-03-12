import { Tx } from '../../../mode-lab-playground-sdk/src/datamodel'

export const padNumber = (integer: number, size = 2): string => {
  let result = integer.toString()
  while (result.length < size) {
    result = '0' + result
  }

  return result
}

export const toPrettyDate = (datetime: string): string => {
  const d = new Date(datetime)
  const date = padNumber(d.getDate())
  const month = padNumber(d.getMonth() + 1)
  const year = d.getFullYear()

  return `${date}/${month}/${year}`
}

export const safeStringify = (data: any): string => {
  try {
    return JSON.stringify(data)
  } catch (error) {
    return '[Unable to JSON.stringify]'
  }
}

export const isDefinedObject = (candidate: any): boolean =>
  typeof candidate === 'object' && candidate !== null && candidate !== undefined

export const sortTxsByDate = (a: Tx, b: Tx) => {
  const dateA = new Date(a.datetime)
  const dateB = new Date(b.datetime)

  return dateA.valueOf() - dateB.valueOf()
}
