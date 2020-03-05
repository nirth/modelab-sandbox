import { Actor, Protagonist, AssetsAccount } from '../datamodel'
import { toNormalizedAccounts } from '../utils/toNormalizedAccounts'
import { create } from 'domain'

export const createProtagonist = (name: string, accounts: AssetsAccount[]): Protagonist => {
	return createActor(name, accounts) as Protagonist
}

export const createActor = (name: string, accounts: AssetsAccount[]): Actor => {
	return {
		name,
		accounts: toNormalizedAccounts(accounts),
	}
}
