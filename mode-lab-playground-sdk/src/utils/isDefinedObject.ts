export const isDefinedObject = (candidate: any): boolean =>
	typeof candidate === 'object' && candidate !== null && candidate !== undefined
