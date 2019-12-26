export const isDefinedObject = (testee: any) =>
  typeof testee === 'object' && testee !== null

export const toSafeObject = (target: any) =>
  isDefinedObject(target) ? target : {}
