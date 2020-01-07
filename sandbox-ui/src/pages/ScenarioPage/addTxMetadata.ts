import { Tx } from '../../datamodel/core'
import { TxDisplayMetadata } from './datamodel'
import { resolveTxDirection } from './resolveTxDirection'
import { resolveTxColor } from './resolveTxColor'

export const addTxMetadata = (currentIndex: number) => (
  tx: Tx,
  index: number
): TxDisplayMetadata => {
  const { type, amount } = tx
  const isCurrent = currentIndex === index
  const isExecuted = currentIndex > index

  const [isNotification, isMoneyIn] = resolveTxDirection(type, amount)
  const color = resolveTxColor(isNotification, isMoneyIn)

  return {
    isCurrent,
    isExecuted,
    isNotification,
    isMoneyIn,
    color,
    tx,
  }
}
