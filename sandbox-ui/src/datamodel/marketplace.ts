import { Tx } from './core'

export enum NotificationChannel {
  Preferred = 'PREFERRED',
  AppNotification = 'APP_NOTIFICATION',
  SmsNotification = 'SMS_NOTIFICATION',
  EmailNotification = 'EMAIL_NOTIFICATION',
  PostNotification = 'POST_NOTIFICATION',
}

export enum ActionType {
  Notification = 'NOTIFICATION',
  Declined = 'DECLINED',
  ScenarioFinished = 'SCENARIO_FINISHED',
}

export type Action = {
  type: ActionType
  payload: any
}

export type CompiledApp = (tx: Tx) => [boolean, Action[]]

export type NotifyOperation = (
  channels: NotificationChannel[],
  heading: string,
  body: string
) => Action
