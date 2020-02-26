import { Tx } from '../../sbdk/datamodel'

export type TxDisplayMetadata = {
  isCurrent: boolean
  isPastTx: boolean
  isDeclined: boolean
  isSettled: boolean
  isNotification: boolean
  isMoneyIn: boolean
  color: string | number
  tx: Tx
}
