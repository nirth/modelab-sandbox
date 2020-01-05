// export const isDefinedObject = (testee: any) =>
//   typeof testee === 'object' && testee !== null

// export const toSafeObject = (target: any) =>
//   isDefinedObject(target) ? target : {}

export const padNumber = (integer: number, size = 2): string => {
  let candidate = integer.toString()
  while (candidate.length < size) {
    candidate = '0' + candidate
  }

  return candidate
}

export const toPrettyDate = (datetime: string): string => {
  const d = new Date(datetime)
  const date = padNumber(d.getDate())
  const month = padNumber(d.getMonth() + 1)
  const year = d.getFullYear()

  return `${date}/${month}/${year}`
}
