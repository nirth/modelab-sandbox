export const addLeadingZeroes = (candidate: string | number, length: number): string => {
	if (typeof candidate === 'number') {
		return addLeadingZeroes(candidate.toString(), length)
	}

	let result = candidate

	while (result.length < length) {
		result = '0' + result
	}

	return result
}
