import { Account, AccountKind } from '../datamodel'

const currencies = {
  GBP: ['British Pound', '£'],
  EUR: ['Euro', '€'],
  BTC: ['Bitcoin', '₿'],
}

const resolveCurrency = (ccyCode: string) => currencies[ccyCode]

export const createCashAccount = (
  name: string,
  accountNumber: string,
  initialBalance: string,
  ccyCode: string
): Account =>
  createAccount(
    AccountKind.CashAccount,
    name,
    accountNumber,
    initialBalance,
    ccyCode
  )

export const createSecuritiesAccount = (
  name: string,
  accountNumber: string,
  initialBalance: string,
  ccyCode: string
): Account =>
  createAccount(
    AccountKind.SecuritiesAccount,
    name,
    accountNumber,
    initialBalance,
    ccyCode
  )

export const createBitcoinWallet = (
  name: string,
  walletAddress: string,
  initialBalance: string,
  ccyCode: string
): Account =>
  createAccount(
    AccountKind.BtcWallet,
    name,
    walletAddress,
    initialBalance,
    ccyCode
  )

export const createAccount = (
  kind: AccountKind,
  name: string,
  paymentInstrument: string,
  initialBalance: string,
  ccyCode: string
): Account => {
  const [ccy, ccySymbol] = resolveCurrency(ccyCode)

  return {
    name,
    kind,
    paymentInstrument,
    ccy,
    ccyCode,
    ccySymbol,
    balance: initialBalance,
  }
}
