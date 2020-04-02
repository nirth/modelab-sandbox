import { IsoDate } from '../datamodel'
import { addLeadingZeroes } from './addLeadingZeroes'
import { eachDayOfInterval, eachMonthOfInterval, formatISO } from 'date-fns'

export const computeMonths = (fromDate: IsoDate, toDate: IsoDate): IsoDate[] => {
	const months = eachMonthOfInterval({
		start: new Date(fromDate),
		end: new Date(toDate),
	})

	const daysOffset = new Date(fromDate).getDate()
	const allMonths = months
		.map((date: Date) => (date.setDate(daysOffset), date))
		.map((date: Date): string => formatISO(date, { representation: 'date' }))

	return allMonths
}

export const computeAllDays = (fromDate: IsoDate, toDate: IsoDate): IsoDate[] => {
	const days = eachDayOfInterval({
		start: new Date(fromDate),
		end: new Date(toDate),
	})

	const allDays = days.map((date: Date) => formatISO(date, { representation: 'date' }))

	return allDays
}
