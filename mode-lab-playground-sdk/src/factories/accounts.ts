import { Account, AccountKind, AccountPurpose } from '../datamodel'

const currencies = {
  GBP: ['British Pound', '£'],
  EUR: ['Euro', '€'],
  BTC: ['Bitcoin', '₿'],
}

const resolveCurrency = (ccyCode: string) => currencies[ccyCode]

export const createCashAccount = (
  name: string,
  accountPurpose: AccountPurpose, 
  accountNumber: string,
  initialBalance: string,
  ccyCode: string
): Account =>
  createAccount(
    AccountKind.CashAccount,
    name,
    accountPurpose, 
    accountNumber,
    initialBalance,
    ccyCode
  )

export const createSecuritiesAccount = (
  name: string,
  accountPurpose: AccountPurpose, 
  accountNumber: string,
  initialBalance: string,
  ccyCode: string
): Account =>
  createAccount(
    AccountKind.SecuritiesAccount,
    name,
    accountPurpose, 
    accountNumber,
    initialBalance,
    ccyCode
  )

export const createBitcoinWallet = (
  name: string,
  accountPurpose: AccountPurpose, 
  walletAddress: string,
  initialBalance: string,
  ccyCode: string
): Account =>
  createAccount(
    AccountKind.BtcWallet,
    name,
    accountPurpose, 
    walletAddress,
    initialBalance,
    ccyCode
  )

export const createAccount = (
  kind: AccountKind,
  name: string,
  accountPurpose: AccountPurpose,
  paymentInstrument: string,
  initialBalance: string,
  ccyCode: string
): Account => {
  const [ccy, ccySymbol] = resolveCurrency(ccyCode)

  return {
    name,
    kind,
    accountPurpose,
    paymentInstrument,
    ccy,
    ccyCode,
    ccySymbol,
    balance: initialBalance,
  }
}
