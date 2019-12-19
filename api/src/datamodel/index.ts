export enum FiatCcy {
  Gbp = 'GBP',
  Usd = 'USD',
  Eur = 'EUR',
}

export enum CryptoCcy {
  Btc = 'BTC',
}

export enum FiatTxnStatus {
  Created = 'created',
  Initiated = 'initiated',
  Executed = 'executed',
  Cleared = 'cleared',
  Settled = 'settled',
  Declined = 'declined',
}

export type CryptoTxn = {
  amount: string
  currency: string // CryptoCcy
}

export type IFiatTxn = {
  internalId: string
  status: string
  amount: string
  currency: FiatCcy
  from: PaymentInstrument
  counterParty: PaymentInstrument
  createdAt: Datetime
  executedAt?: Datetime
  settledAt?: Datetime
}

export type Datetime = string
export type PaymentInstrument = string
export type Amount = string

// export type ScanPaymentInstrument = {
//   sortCode: string
//   accountNumber: string
// }

// Payment Instrument details according to SWIFT / ISO 20022
export type IbanPaymentInstrument = {
  swiftCode: string
  accountNumber: string
}
