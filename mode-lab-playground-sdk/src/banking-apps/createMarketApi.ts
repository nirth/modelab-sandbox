import {
  NotificationChannel,
  Action,
  NotifyApiOperation,
  TransferApiOperation,
  ActionKind,
} from './datamodel'

const notify = (actions: Action[]): NotifyApiOperation => (
  channels: NotificationChannel[],
  heading: string,
  body: string
) => {
  const action: Action = {
    kind: ActionKind.Notification,
    payload: {
      channels,
      heading,
      body,
    },
  }

  actions.push(action)
  return action
}

const createInternalTransfer = (actions: Action[]): TransferApiOperation => (
  datetime: string,
  originatorAccount: string,
  destinationAccount: string,
  ccyCode: string,
  amount: string
) => {
  const action: Action = {
    kind: ActionKind.CreateInternalTransfer,
    payload: {
      datetime,
      originatorAccount,
      destinationAccount,
      ccyCode,
      amount,
    },
  }
  return action
}

export const createMarketApi = (actions: Action[]) => ({
  notify: notify(actions),
  createInternalTransfer: createInternalTransfer(actions),
})
