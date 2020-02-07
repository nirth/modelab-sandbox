import {
  NotificationChannel,
  Action,
  NotifyOperation,
  ActionType,
} from '../../datamodel/marketplace'

const notify = (actions: Action[]): NotifyOperation => (
  channels: NotificationChannel[],
  heading: string,
  body: string
) => {
  const action = {
    type: ActionType.Notification,
    payload: {
      channels,
      heading,
      body,
    },
  }

  actions.push(action)
  return action
}

export const createMarketApi = (actions: Action[]) => ({
  notify: notify(actions),
})
