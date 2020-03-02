import { IsoDate } from '../datamodel'
import { addLeadingZeroes } from './addLeadingZeroes'
type DatePart = string | number

export const toIsoDate = (year: DatePart, month: DatePart, day: DatePart): IsoDate =>
	`${addLeadingZeroes(year, 4)}-${addLeadingZeroes(month, 2)}-${addLeadingZeroes(day, 2)}}`
