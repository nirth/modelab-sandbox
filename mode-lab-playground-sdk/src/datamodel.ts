export type IsoDate = string

export enum TxType {
	DirectDebitPayment = 'DIRECT_DEBIT_PAYMENT',
	DirectDebitAnnouncement = 'DIRECT_DEBIT_ANNOUNCEMENT',
	CreditTransfer = 'CREDIT_TRANSFER',
}

export type Tx = {
	id: string
	type: TxType
	datetime: IsoDate
	amount: string
	creditorCustomer: string
	creditorBankAccount: string
	sender: string
	receiver: string
	debitorCustomer: string
	debitorBankAccount: string
}

export type DirectDebitPaymentTx = Tx & {
	type: TxType.DirectDebitPayment
}

export type DirectDebitAnnouncementTx = Tx & {
	type: TxType.DirectDebitAnnouncement
}

export type CreditTransferTx = Tx & {
	type: TxType.CreditTransfer
}

export type PaymentScenario = {
	id: string
	slug: string
	title: string
	protagonist: Protagonist
	description: string
	accounts: AssetsAccount[]
	paymentTxs: Tx[]
}

export type PaymentScenarioDisplayState = {
	scenarioLoaded: boolean
	readyToPlay: boolean
	scenarioFinished: boolean
	accounts: AssetsAccount[]
	bankingAppSourceCode: string
	scenarioId: string
	txIndex: number
	txs: Tx[]
	declinedTxs: Tx[]
	settledTxs: Tx[]
	createdTxs: Tx[]
	outcomes: Outcome[]
}

export type TxFactory<TxType> = (overrides: any) => TxType

export enum AssetKind {
	Cash = 'CASH',
	NativeCrypto = 'NATIVE_CRYPTO',
	Security = 'SECURITY',
}

export type AssetsAccount = {
	assetKind: AssetKind
	name: string
	paymentInstrument: string
	ccy: string
	ccyCode: string
	ccySymbol: string
	balance: string
}

export type CashBankAccount = AssetsAccount & {
	assetKind: AssetKind.Cash
}

export type NormalizedAccounts = {
	[paymentInstrument: string]: AssetsAccount
}

export enum OutcomeKind {
	Notification = 'NOTIFICATION',
	CreateInternalTransfer = 'CREATE_INTERNAL_TRANSFER',
	Executed = 'EXECUTED',
	Declined = 'DECLINED',
	ScenarioFinished = 'SCENARIO_FINISHED',
}

export type Outcome = {
	kind: OutcomeKind
	heading: string
	body: string
	payload: object
}

export type Protagonist = Actor

export type Actor = {
	name: string
	accounts: NormalizedAccounts
}
