// export const isDefinedObject = (testee: any) =>
//   typeof testee === 'object' && testee !== null

// export const toSafeObject = (target: any) =>
//   isDefinedObject(target) ? target : {}

export const padMonthOrDate = (integer: number): string => {
  const candidate = integer.toString()
  const result = candidate.length < 2 ? `0${candidate}` : candidate

  return result
}

export const toPrettyDate = (datetime: string): string => {
  const d = new Date(datetime)
  const date = padMonthOrDate(d.getDate())
  const month = padMonthOrDate(d.getMonth() + 1)
  const year = d.getFullYear()

  return `${date}/${month}/${year}`
}
