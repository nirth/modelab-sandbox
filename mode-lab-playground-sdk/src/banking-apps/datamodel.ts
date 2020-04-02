import { Tx } from '../datamodel'

export enum ActionKind {
  Notification = 'NOTIFICATION',
  CreateInternalTransfer = 'CREATE_INTERNAL_TRANSFER',
  Executed = 'EXECUTED',
  Declined = 'DECLINED',
}

export type Action = {
  kind: ActionKind
  payload: any
}

export type CompiledApp = (tx: Tx) => [boolean, Action[]]

export enum NotificationChannel {
  Preferred = 'PREFERRED',
  AppNotification = 'APP_NOTIFICATION',
  SmsNotification = 'SMS_NOTIFICATION',
  EmailNotification = 'EMAIL_NOTIFICATION',
  PostNotification = 'POST_NOTIFICATION',
}

export type NotifyApiOperation = (
  channels: NotificationChannel[],
  heading: string,
  body: string
) => Action

export type TransferApiOperation = (
  datetime: string,
  originatorAccount: string,
  destinationAccount: string,
  ccyCode: string,
  amount: string
) => Action
