import { Tx } from '../../datamodel/core'
import { TxDisplayMetadata } from './datamodel'
import { resolveTxDirection } from './resolveTxDirection'
import { resolveTxColor } from './resolveTxColor'

export const addTxMetadata = (
  currentIndex: number,
  declinedTxIndicies: number[]
) => (tx: Tx, index: number): TxDisplayMetadata => {
  const { type, amount } = tx
  const isCurrent = currentIndex === index
  const isPastTx = currentIndex > index
  const isDeclined = declinedTxIndicies.includes(index)

  const [isNotification, isMoneyIn] = resolveTxDirection(type, amount)
  const color = resolveTxColor(isNotification, isMoneyIn)

  return {
    isCurrent,
    isDeclined,
    isPastTx,
    isNotification,
    isMoneyIn,
    color,
    tx,
  }
}
