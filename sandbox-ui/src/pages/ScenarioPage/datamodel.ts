import { Tx } from '../../datamodel/core'

export type TxDisplayMetadata = {
  isCurrent: boolean
  isDeclined: boolean
  isPastTx: boolean
  isNotification: boolean
  isMoneyIn: boolean
  color: string | number
  tx: Tx
}
