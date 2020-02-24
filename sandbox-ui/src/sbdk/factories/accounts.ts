import { Account, AccountKind } from '../datamodel'

const currencies = {
  gbp: ['GBP', 'British Pound', '£'],
  eur: ['EUR', 'Euro', '€'],
  btc: ['BTC', 'Bitcoin', '₿'],
}

const resolveCurrency = (ccyCode: string) => currencies[ccyCode]

export const createCurrentAccount = (
  name: string,
  accountNumber: string,
  initialBalance: string,
  ccyCode: string
): Account =>
  createAccount(
    AccountKind.CurrentAccount,
    name,
    accountNumber,
    initialBalance,
    ccyCode
  )

export const createSavingsAccount = (
  name: string,
  accountNumber: string,
  initialBalance: string,
  ccyCode: string
): Account =>
  createAccount(
    AccountKind.SavingsAccount,
    name,
    accountNumber,
    initialBalance,
    ccyCode
  )

export const createIsaAccount = (
  name: string,
  accountNumber: string,
  initialBalance: string,
  ccyCode: string
): Account =>
  createAccount(
    AccountKind.IsaAccount,
    name,
    accountNumber,
    initialBalance,
    ccyCode
  )

export const createLifeIsaAccount = (
  name: string,
  accountNumber: string,
  initialBalance: string,
  ccyCode: string
): Account =>
  createAccount(
    AccountKind.LifeIsaAccount,
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
    AccountKind.LifeIsaAccount,
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
  const [_, ccy, ccySymbol] = resolveCurrency(ccyCode)

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
