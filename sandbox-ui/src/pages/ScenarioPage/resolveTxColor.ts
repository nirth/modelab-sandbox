export const resolveTxColor = (
  isNotification: boolean,
  isMoneyIn: boolean
): any => {
  if (isNotification) {
    return 'pink'
  } else if (isMoneyIn) {
    return 'olive'
  } else if (!isMoneyIn) {
    return 'red'
  } else {
    return 'grey'
  }
}
