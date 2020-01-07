import { TxType } from '../../datamodel/core'

// Crude, dirty, and fast way to calculate directionality of transaction.
export const resolveTxDirection = (
  type: string,
  amount: string
): [boolean, boolean] => {
  const isNotification = type === TxType.DirectDebitAnnouncement
  const isMoneyIn =
    !isNotification && parseFloat(amount) >= 0 && type === TxType.Payment

  return [isNotification, isMoneyIn]
}
