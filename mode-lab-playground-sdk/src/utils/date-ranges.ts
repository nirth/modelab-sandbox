import { IsoDate } from '../datamodel'
import { addLeadingZeroes } from './addLeadingZeroes'

export const computeMonths = (fromDate: IsoDate, toDate: IsoDate): IsoDate[] => {
	const [startYear, startMonth, startDay] = fromDate.split('-')
	const startYearInt = parseInt(startYear, 10)
	const startMonthInt = parseInt(startMonth, 10)

	const [endYear, endMonth, endDay] = toDate.split('-')
	const endYearInt = parseInt(endYear, 10)
	const endMonthInt = parseInt(endMonth, 10)
	// console.log('startMonthInt:', startMonthInt, 'endMonthInt:', endMonthInt)
	const yearsDelta = endYearInt - startYearInt
	const monthsDelta = endMonthInt - (startMonthInt - 1)

	const numMonths = yearsDelta * 12 + monthsDelta

	const result = Array.from({ length: numMonths }).map((_, index): string => {
		const maybeMonth = startMonthInt + index
		if (maybeMonth < 13) {
			return `${startYearInt}-${addLeadingZeroes(maybeMonth, 2)}-${startDay}`
		} else {
			const yearsElapsed = (maybeMonth - (maybeMonth % 12)) / 12
			return `${startYearInt + yearsElapsed}-${addLeadingZeroes(maybeMonth - 12, 2)}-${startDay}`
		}
	})

	return result
}

export const computeAllDays = (fromDate: IsoDate, toDate: IsoDate): IsoDate[] => {
	const [startYear, startMonth, startDay] = fromDate.split('-')
	const startYearInt = parseInt(startYear, 10)
	const startMonthInt = parseInt(startMonth, 10)
	const startDayInt = parseInt(startDay, 10)

	const [endYear, endMonth, endDay] = toDate.split('-')
	const endYearInt = parseInt(endYear, 10)
	const endMonthInt = parseInt(endMonth, 10)
	const endDayInt = parseInt(endDay, 10)

	const computedMonths = computeMonths(fromDate, toDate)

	const result = computedMonths
		.map((datetime: IsoDate) =>
			Array.from({ length: 28 }).map((_, index: number) => {
				const [year, month, day] = datetime.split('-')
				return `${year}-${month}-${addLeadingZeroes(index + 1, 2)}`
			})
		)
		.reduce((combinedDates, currentMonthDates) => combinedDates.concat(currentMonthDates), [])

	return result
}
