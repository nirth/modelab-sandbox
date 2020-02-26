import { Tx } from '../../sbdk/datamodel'
import { TxDisplayMetadata } from './datamodel'
import { resolveTxDirection } from './resolveTxDirection'
import { resolveTxColor } from './resolveTxColor'

export const addTxMetadata = (
  currentIndex: number,
  settledTxsFks: string[],
  declinedTxsFks: string[]
) => (tx: Tx, index: number): TxDisplayMetadata => {
  const { id, type, amount } = tx
  const isCurrent = currentIndex === index
  
  const isSettled = settledTxsFks.includes(id)
  const isDeclined = declinedTxsFks.includes(id)
  const isPastTx = isSettled || isDeclined

  const [isNotification, isMoneyIn] = resolveTxDirection(type, amount)
  const color = resolveTxColor(isNotification, isMoneyIn)

  return {
    isCurrent,
    isPastTx,
    isDeclined,
    isSettled,
    isNotification,
    isMoneyIn,
    color,
    tx,
  }
}
