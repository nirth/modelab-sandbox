const currencies: { [ccyCode: string]: string[] } = {
	GBP: ['British Pound', '£'],
	EUR: ['Euro', '€'],
	BTC: ['Bitcoin', '₿'],
}

export const resolveCcyMetadata = (ccyCode: string): string[] => {
	const maybeMetadata = currencies[ccyCode]

	if (Array.isArray(maybeMetadata)) {
		return [ccyCode, ...maybeMetadata]
	}

	throw new Error(`Unable to resolve currency for code ${ccyCode}`)
}
