import { Tx } from '../../sbdk/datamodel'
import { TxDisplayMetadata } from './datamodel'
import { resolveTxDirection } from './resolveTxDirection'
import { resolveTxColor } from './resolveTxColor'

export const addTxMetadata = (
  currentIndex: number,
  declinedTxsFks: string[]
) => (tx: Tx, index: number): TxDisplayMetadata => {
  const { id, type, amount } = tx
  const isCurrent = currentIndex === index
  const isPastTx = currentIndex > index
  const isDeclined = declinedTxsFks.includes(id)

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
