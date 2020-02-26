import React, { useEffect } from 'react'
import { Tx } from '../../sbdk/datamodel'
import { Segment, SemanticCOLORS, Label } from 'semantic-ui-react'
import { TxDisplay } from './TxDisplay'
import { addTxMetadata } from './addTxMetadata'
import { TxDisplayMetadata } from './datamodel'

type TxListProps = {
  currentTxIndex: number
  txs: Tx[]
  declinedTxFks: string[]
}

export const TxList = (props: TxListProps) => {
  const { currentTxIndex, txs, declinedTxFks } = props

  useEffect(() => {
    // TODO: I should use `useRef`, but it gave me too much headache.
    // Still have to figure out how to use it later.
    const currentTxElement = document.querySelector('[data-current-tx=yes]')
    setTimeout(
      () =>
        currentTxElement?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        }),
      300
    )
  })

  return (
    <Segment
      style={{
        height: 'calc(100vh - 20em)',
        overflowY: 'scroll',
        overflowX: 'hidden',
      }}
    >
      {txs
        .map(addTxMetadata(currentTxIndex, declinedTxFks))
        .map((metadata: TxDisplayMetadata) => {
          const {
            isCurrent,
            isDeclined,
            isPastTx,
            isNotification,
            color,
            tx,
          } = metadata
          const { type, amount, datetime } = tx
          const key = `${type}--${datetime}--${amount}`

          const style = {
            paddingTop: '0.2em',
            marginLeft: isCurrent ? '0.5em' : '0em',
            marginRight: isCurrent ? '0em' : '0.5em',
            transition: 'all 250ms ease-in-out 0ms',
          }

          const labelProps = {
            style: {
              transition: 'all ease-in 0.5s',
              opacity:
                (isDeclined || isPastTx || isCurrent) && !isNotification
                  ? 1
                  : 0,
            },
            color: (isDeclined ? 'red' : 'olive') as any,
            content: isDeclined ? 'Declined' : 'Settled',
            attached: 'top right' as any,
          }

          return (
            <Segment
              data-current-tx={isCurrent ? 'yes' : 'no'}
              key={key}
              style={style}
              secondary={isPastTx}
              raised={isCurrent}
              color={color as SemanticCOLORS}
            >
              <Label {...labelProps} />
              <TxDisplay tx={tx} />
            </Segment>
          )
        })}
    </Segment>
  )
}
