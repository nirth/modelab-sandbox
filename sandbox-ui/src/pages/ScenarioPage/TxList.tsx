import React, { useEffect } from 'react'
import { Tx } from '../../datamodel/core'
import { Segment, SemanticCOLORS } from 'semantic-ui-react'
import { TxDisplay } from './TxDisplay'
import { addTxMetadata } from './addTxMetadata'
import { TxDisplayMetadata } from './datamodel'

type TxListProps = {
  currentTxIndex: number
  txs: Tx[]
}

export const TxList = (props: TxListProps) => {
  const { currentTxIndex, txs } = props

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
        overflow: 'hidden scroll',
      }}
    >
      {txs
        .map(addTxMetadata(currentTxIndex))
        .map((metadata: TxDisplayMetadata) => {
          const { isCurrent, isExecuted, color, tx } = metadata
          const { type, amount, datetime } = tx
          const key = `${type}--${datetime}--${amount}`
          // const ref = isCurrent ? currentTxDisplayElement : undefined

          const style = {
            paddingTop: '0.2em',
            marginLeft: isCurrent ? '0.5em' : '0em',
            marginRight: isCurrent ? '0em' : '0.5em',
            transition: 'all 250ms ease-in-out 0ms',
          }

          return (
            <Segment
              data-current-tx={isCurrent ? 'yes' : 'no'}
              key={key}
              style={style}
              secondary={isExecuted}
              raised={isCurrent}
              color={color as SemanticCOLORS}
            >
              <TxDisplay tx={tx} />
            </Segment>
          )
        })}
    </Segment>
  )
}
