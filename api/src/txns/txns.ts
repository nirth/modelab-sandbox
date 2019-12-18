import {
  PaymentInstrument,
  Amount,
  IFiatTxn,
  Datetime,
  FiatCcy,
} from '../datamodel'

const createTxn = (
  status: string,
  from: PaymentInstrument,
  counterParty: PaymentInstrument,
  amount: Amount,
  currency: FiatCcy,
  createdAt: Datetime
): IFiatTxn => {
  return {
    status,
    from,
    counterParty,
    amount,
    currency,
    createdAt,
  }
}

export const pushTxn = (
  from: PaymentInstrument,
  counterParty: PaymentInstrument,
  amount: Amount,
  currency: FiatCcy
): IFiatTxn => {
  const txn = createTxn(
    'initiated',
    from,
    counterParty,
    amount,
    currency,
    Date.now().toString()
  )

  return txn
}
