import { Tx, TxType } from '../datamodel'
import { safeStringify } from '../../../sandbox-ui/src/utils'
import { CompiledApp, Action } from './datamodel'
import { createMarketApi } from './createMarketApi'

/* eslint-disable no-new-func */

const downTheSingularity = (tx: Tx) => () => []

const invoke = (results: boolean[], tx: Tx) => (handler: CompiledApp) => {
	const result = handler(tx)

	if (typeof result === 'boolean') {
		results.push(result)
	} else {
		throw new Error(
			`Event Handler must return 'boolean',
      instead attempted to return ${safeStringify(result)}`
		)
	}
}

export const transpileApp = (code: string): CompiledApp => {
	const func = new Function(
		'api',
		'tx',
		`
    // Nullify Window and Document for security reasons
    const window = null
    const document = null

    const actions = [];
    const {onTx, onPayment, onDirectDebitAnnouncement, onDirectDebitPayment, onSalaryPayment, notify} = api

    ${code}

    return actions
  `
	)

	return (tx: Tx) => {
		const isPayment = tx.type === TxType.CreditTransfer
		const isDdAnnouncement = tx.type === TxType.DirectDebitAnnouncement
		const isDdPayment = tx.type === TxType.DirectDebitPayment
		const isSalary = tx.type === TxType.CreditTransfer && parseInt(tx.amount, 10) > 3000

		const invocationResults = []
		const actions: Action[] = []
		const api = createMarketApi(actions)

		const updatedApi = {
			...api,
			onTx: invoke(invocationResults, tx),
			onPayment: isPayment ? invoke(invocationResults, tx) : downTheSingularity,
			onDirectDebitAnnouncement: isDdAnnouncement
				? invoke(invocationResults, tx)
				: downTheSingularity,
			onDirectDebitPayment: isDdPayment ? invoke(invocationResults, tx) : downTheSingularity,
			onSalaryPayment: isSalary ? invoke(invocationResults, tx) : downTheSingularity,
		}

		actions.push(...func(updatedApi, tx))

		const shouldContinueExecution = invocationResults.every((result: boolean): boolean => result)

		return [shouldContinueExecution, actions]
	}
}
