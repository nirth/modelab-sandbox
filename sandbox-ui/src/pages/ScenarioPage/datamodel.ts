import { Tx } from '../../datamodel/core'

export type TxDisplayMetadata = {
  isCurrent: boolean
  isExecuted: boolean
  isNotification: boolean
  isMoneyIn: boolean
  color: string | number
  tx: Tx
}
