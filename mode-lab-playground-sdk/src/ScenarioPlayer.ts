import {
	AssetsAccount,
	IsoDate,
	Tx,
	TxType,
	Outcome,
	OutcomeKind,
	NormalizedAccounts,
	PaymentScenario,
	PaymentScenarioDisplayState,
	ScenarioEvent,
	ScenarioEventType,
	Protagonist,
} from './datamodel'
import { transpileApp } from './banking-apps/transpileApp'
import { CompiledApp, Action } from './banking-apps/datamodel'
import { actionToOutcome } from './factories/outcomes'
import { sortTxsByDate, isDefinedObject } from './utils'
import { eachDayOfInterval, formatISO } from 'date-fns'

const createStartOfDayEvent = (datetime: IsoDate): ScenarioEvent => {
	return { type: ScenarioEventType.DayStart, datetime }
}

const createEndOfDayEvent = (datetime: IsoDate): ScenarioEvent => {
	return { type: ScenarioEventType.DayEnd, datetime }
}

const resolveScenarioEventTypeByTx = (tx: Tx, protagonist: Protagonist): ScenarioEventType => {
	switch (tx.type) {
		case TxType.CreditTransfer:
			if (tx.creditorCustomer === protagonist.name) {
				return ScenarioEventType.IncomingPayment
			} else if (tx.debitorCustomer === protagonist.name) {
				return ScenarioEventType.OutgoingPayment
			} else {
				return ScenarioEventType.UnknownPayment
			}
		case TxType.DirectDebitAnnouncement:
			return ScenarioEventType.DirectDebitAnnouncement
		case TxType.DirectDebitPayment:
			return ScenarioEventType.DirectDebitPayment
		default:
			return ScenarioEventType.Unkonwn
	}
}

const createTxEvents = (txs: Tx[], protagonist: Protagonist): ScenarioEvent[] => {
	return txs.map((tx) => {
		return { type: resolveScenarioEventTypeByTx(tx, protagonist), datetime: tx.datetime }
	})
}

const createEvents = (days: Date[], txs: Tx[], protagonist: Protagonist): ScenarioEvent[] => {
	return days
		.map((day): any => {
			const today: IsoDate = formatISO(day, { representation: 'date' })
			const todaysTxs = txs.filter((tx: Tx): boolean => tx.datetime === today)
			return [
				createStartOfDayEvent(today),
				...createTxEvents(todaysTxs, protagonist),
				createEndOfDayEvent(today),
			]
		})
		.reduce((mergedEvents, dailyEvents) => mergedEvents.concat(dailyEvents), [])
}

export class ScenarioPlayer {
	_accounts: NormalizedAccounts
	_scenario: PaymentScenario
	_txs: Tx[]
	_settledTxs: Tx[]
	_declinedTxs: Tx[]
	_createdTxs: Tx[]
	_outcomes: Outcome[]
	_initialCustomerAccounts: any
	_bankingApp?: CompiledApp
	_bankingAppSourceCode: string
	_shouldRecompileBankingApp: boolean
	_startDate: IsoDate
	_endDate: IsoDate
	_datetime: IsoDate
	_days: Date[]
	_events: ScenarioEvent[]
	_currentEventIndex: number

	constructor(scenario: PaymentScenario) {
		this._scenario = scenario
		this._accounts = scenario.protagonist.accounts
		this._txs = scenario.txs.concat([])

		this._settledTxs = []
		this._declinedTxs = []
		this._createdTxs = []
		this._outcomes = []
		this._bankingAppSourceCode = ''
		this._shouldRecompileBankingApp = false

		const firstTx = this._txs[0]
		const lastTx = this._txs[this._txs.length - 1]

		this._startDate = firstTx.datetime
		this._endDate = lastTx.datetime

		this._days = eachDayOfInterval({
			start: new Date(this._startDate),
			end: new Date(this._endDate),
		})

		this._datetime = firstTx.datetime

		this._events = createEvents(this._days, this._txs, this._scenario.protagonist)
		this._currentEventIndex = 0
	}

	get startDate(): IsoDate {
		return this._startDate
	}

	get endDate(): IsoDate {
		return this._endDate
	}

	get datetune(): IsoDate {
		return this._datetime
	}

	get numEvents(): number {
		return this._events.length
	}

	next(): any {
		if (this._currentEventIndex === this._events.length) {
			return { type: ScenarioEventType.ScenarioFinished }
		}

		const currentEvent = this._events[this._currentEventIndex]
		this._currentEventIndex += 1

		return { event: currentEvent }
	}
}
