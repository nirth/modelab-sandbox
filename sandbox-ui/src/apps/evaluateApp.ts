import { Tx, TxType } from '../datamodel/core'
import { safeStringify } from '../utils'

/* eslint-disable no-new-func */

export type Action = {
  type: string
  payload?: any
}

type EventHandler = (tx: Tx) => Action[]

const downTheSingularity = (tx: Tx) => () => []

const invoke = (results: boolean[], tx: Tx) => (handler: EventHandler) => {
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

export const evaluateApp = (code: string) => {
  const func = new Function(
    'invokers',
    'tx',
    `
    // Nullify Window and Document for security reasons
    const window = null
    const document = null

    const actions = [];
    const {onTx, onPayment, onDirectDebitAnnouncement, onDirectDebitPayment} = invokers

    ${code}

    return actions
  `
  )

  return (tx: Tx) => {
    const isPayment = tx.type === TxType.Payment
    const isDdAnnouncement = tx.type === TxType.DirectDebitAnnouncement
    const isDdPayment = tx.type === TxType.DirectDebitPayment

    const invocationResults = []

    const invokers = {
      onTx: invoke(invocationResults, tx),
      onPayment: isPayment ? invoke(invocationResults, tx) : downTheSingularity,
      onDirectDebitAnnouncement: isDdAnnouncement
        ? invoke(invocationResults, tx)
        : downTheSingularity,
      onDirectDebitPayment: isDdPayment
        ? invoke(invocationResults, tx)
        : downTheSingularity,
    }

    const actions = func(invokers, tx)
    const shouldContinueExecution = invocationResults.every(
      (result: boolean): boolean => result
    )

    return [shouldContinueExecution, actions]
  }
}
