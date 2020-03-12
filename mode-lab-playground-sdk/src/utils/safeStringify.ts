export const safeStringify = (data: any): string => {
	try {
		return JSON.stringify(data)
	} catch (error) {
		return '[Unable to JSON.stringify]'
	}
}
