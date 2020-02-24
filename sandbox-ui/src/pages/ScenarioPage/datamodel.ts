import { Tx } from '../../sbdk/datamodel'

export type TxDisplayMetadata = {
  isCurrent: boolean
  isDeclined: boolean
  isPastTx: boolean
  isNotification: boolean
  isMoneyIn: boolean
  color: string | number
  tx: Tx
}
