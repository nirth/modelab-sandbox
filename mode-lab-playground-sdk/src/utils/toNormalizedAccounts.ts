import { NormalizedAccounts, AssetsAccount } from '../datamodel'

export const toNormalizedAccounts = (accounts: AssetsAccount[]): NormalizedAccounts => {
	return accounts.reduce((normalizedAccounts, account) => {
		return {
			...normalizedAccounts,
			[account.paymentInstrument]: account,
		}
	}, {})
}
