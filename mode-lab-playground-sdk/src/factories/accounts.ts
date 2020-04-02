import { AssetsAccount, AssetKind } from '../datamodel'
import { resolveCcyMetadata } from '../utils'

export const createCashAccount = (
	name: string,
	accountNumber: string,
	initialBalance: string,
	ccyCode: string
): AssetsAccount => createAccount(AssetKind.Cash, name, accountNumber, initialBalance, ccyCode)

export const createNativeCryptoAccount = (
	name: string,
	walletAddress: string,
	initialBalance: string,
	ccyCode: string
): AssetsAccount =>
	createAccount(AssetKind.NativeCrypto, name, walletAddress, initialBalance, ccyCode)

export const createAccount = (
	assetKind: AssetKind,
	name: string,
	paymentInstrument: string,
	initialBalance: string,
	ccyCode: string
): AssetsAccount => {
	const [_, ccy, ccySymbol] = resolveCcyMetadata(ccyCode)

	return {
		name,
		assetKind,
		paymentInstrument,
		ccy,
		ccyCode,
		ccySymbol,
		balance: initialBalance,
	}
}
