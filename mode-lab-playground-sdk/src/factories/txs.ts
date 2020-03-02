import {
	DirectDebitAnnouncementTx,
	DirectDebitPaymentTx,
	TxType,
	CreditTransferTx,
	IsoDate,
	Tx,
} from '../datamodel'
import { computeMonths } from '../utils'
import { fromString as uuidFromString } from 'uuidv4'
import { computeAllDays } from '../utils/date-ranges'

export const createTxId = (
	type: TxType,
	datetime: string,
	creditorBankAccount: string,
	debitorBankAccount: string,
	amount: string
): string => {
	return uuidFromString(type + datetime + creditorBankAccount + debitorBankAccount + amount)
}

const createTx = (
	type: TxType,
	datetime: string,
	amount: string,
	creditorCustomer: string,
	creditorBankAccount: string,
	sender: string,
	receiver: string,
	debitorCustomer: string,
	debitorBankAccount: string
): any => ({
	id: createTxId(type, datetime, creditorBankAccount, debitorBankAccount, amount),
	type,
	datetime,
	amount,
	creditorCustomer,
	creditorBankAccount,
	sender,
	receiver,
	debitorCustomer,
	debitorBankAccount,
})

export const createCreditTransferTx = (
	datetime: string,
	amount: string,
	creditorCustomer: string,
	creditorBankAccount: string,
	sender: string,
	receiver: string,
	debitorCustomer: string,
	debitorBankAccount: string
): CreditTransferTx =>
	createTx(
		TxType.CreditTransfer,
		datetime,
		amount,
		creditorCustomer,
		creditorBankAccount,
		sender,
		receiver,
		debitorCustomer,
		debitorBankAccount
	)

export const createDirectDebitAnnouncementTx = (
	datetime: string,
	amount: string,
	creditorCustomer: string,
	creditorBankAccount: string,
	sender: string,
	receiver: string,
	debitorCustomer: string,
	debitorBankAccount: string
): DirectDebitAnnouncementTx =>
	createTx(
		TxType.DirectDebitAnnouncement,
		datetime,
		amount,
		creditorCustomer,
		creditorBankAccount,
		sender,
		receiver,
		debitorCustomer,
		debitorBankAccount
	)

export const createDirectDebitPaymentTx = (
	datetime: string,
	amount: string,
	creditorCustomer: string,
	creditorBankAccount: string,
	sender: string,
	receiver: string,
	debitorCustomer: string,
	debitorBankAccount: string
): DirectDebitPaymentTx =>
	createTx(
		TxType.DirectDebitPayment,
		datetime,
		amount,
		creditorCustomer,
		creditorBankAccount,
		sender,
		receiver,
		debitorCustomer,
		debitorBankAccount
	)

export const createMonthlySalary = (
	startDatetime: IsoDate,
	endDatetime: IsoDate,
	amount: string,
	creditorCustomer: string,
	creditorBankAccount: string,
	sender: string,
	receiver: string,
	debitorCustomer: string,
	debitorBankAccount: string
): Tx[] => {
	const months = computeMonths(startDatetime, endDatetime)

	return months.map(
		(datetime: IsoDate): Tx =>
			createCreditTransferTx(
				datetime,
				amount,
				creditorCustomer,
				creditorBankAccount,
				sender,
				receiver,
				debitorCustomer,
				debitorBankAccount
			)
	)
}

export const createDailyPayments = (
	startDatetime: IsoDate,
	endDatetime: IsoDate,
	amount: string,
	creditorCustomer: string,
	creditorBankAccount: string,
	sender: string,
	receiver: string,
	debitorCustomer: string,
	debitorBankAccount: string
): Tx[] => {
	const days = computeAllDays(startDatetime, endDatetime)

	return days.map(
		(datetime: IsoDate): Tx =>
			createCreditTransferTx(
				datetime,
				amount,
				creditorCustomer,
				creditorBankAccount,
				sender,
				receiver,
				debitorCustomer,
				debitorBankAccount
			)
	)
}
