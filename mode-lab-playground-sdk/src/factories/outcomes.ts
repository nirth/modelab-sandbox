import { Action, ActionKind } from '../banking-apps/datamodel'
import { Outcome, OutcomeKind } from '../datamodel'
import { safeStringify } from '../../utils'
import { createCreditTransferTx } from './txs'

export const actionToOutcome = (action: Action): Outcome | undefined => {
  switch (action.kind) {
    case ActionKind.Notification:
      console.log('Notification:', action)
      return {
        kind: OutcomeKind.Notification,
        heading: action.payload.heading,
        body: action.payload.body,
        payload: {},
      }
    case ActionKind.CreateInternalTransfer:
      const {
        datetime,
        originatorAccount,
        destinationAccount,
        amount,
      } = action.payload
      return {
        kind: OutcomeKind.CreateInternalTransfer,
        heading: 'Created Internal Transfer',
        body: safeStringify(action),
        payload: {
          creditTransfer: createCreditTransferTx(
            datetime,
            amount,
            'Alice',
            originatorAccount,
            'Mode',
            'Mode',
            'Alice',
            destinationAccount
          ),
        },
      }
    default:
      return undefined
  }
}
