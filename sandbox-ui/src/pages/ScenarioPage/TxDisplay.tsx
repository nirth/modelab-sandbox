import React from 'react'
import { Segment, Icon, Label, Header } from 'semantic-ui-react'
import {
  TxType,
  Tx,
  PaymentTx,
  DirectDebitAnnouncementTx,
  DirectDebitPaymentTx,
} from '../../datamodel/core'
import { toPrettyDate } from '../../utils'

// Crude, dirty, and fast way to calculate directionality of transaction.
const resolveMetadata = (type: string, amount: string): [boolean, boolean] => {
  const isNotification = type === TxType.DirectDebitAnnouncement
  const isMoneyIn =
    !isNotification && parseFloat(amount) >= 0 && type === TxType.Payment

  return [isNotification, isMoneyIn]
}

const resolveTxColor = (isNotification: boolean, isMoneyIn: boolean): any => {
  if (isNotification) {
    return 'pink'
  } else if (isMoneyIn) {
    return 'olive'
  } else if (!isMoneyIn) {
    return 'red'
  } else {
    return 'grey'
  }
}

type TxDisplayProps = {
  current: boolean
  executed: boolean
  tx: Tx
}

const PaymentDisplay = (props: PaymentTx) => {
  const { amount, datetime } = props
  const isIncoming = parseFloat(amount) >= 0
  const color = isIncoming ? 'green' : 'red'
  const icon = isIncoming ? 'caret square up' : 'caret square down'
  const prettyDate = toPrettyDate(datetime)

  return (
    <>
      <Header content="Payment" subheader={prettyDate} />
      <Label color={color} style={{ minWidth: '160px' }}>
        <Icon name={icon} />£{amount}
        <Label.Detail>Payment</Label.Detail>
      </Label>
    </>
  )
}

const DirectDebitAnnouncementDisplay = (props: DirectDebitAnnouncementTx) => {
  const { amount, datetime } = props
  const prettyDate = toPrettyDate(datetime)

  return (
    <>
      <Header content="Direct Debit Announcement" subheader={prettyDate} />
      <Label color="blue" style={{ minWidth: '160px' }}>
        <Icon name="bullhorn" />£{amount}
      </Label>
      <Header as="h5">
        The amount above will be taken from your account in 10 days.
      </Header>
    </>
  )
}

const DirectDebitPaymentDisplay = (props: DirectDebitPaymentTx) => {
  const { amount, datetime } = props
  const prettyDate = toPrettyDate(datetime)

  return (
    <>
      <Header content="Direct Debit Payment" subheader={prettyDate} />
      <Label color="red" style={{ minWidth: '160px' }}>
        <Icon name="caret square down" />£{amount}
        <Label.Detail>Direct Debit</Label.Detail>
      </Label>
    </>
  )
}

export const TxDisplay = (props: TxDisplayProps) => {
  const {
    current,
    executed,
    tx,
    tx: { type, amount },
  } = props

  const [isNotification, isMoneyIn] = resolveMetadata(type, amount)
  const color = resolveTxColor(isNotification, isMoneyIn)

  const style = {
    marginLeft: current ? '0.5em' : '0em',
    marginRight: current ? '0em' : '0.5em',
    transition: 'all 250ms ease-in-out 0ms',
  }

  return (
    <Segment style={style} secondary={executed} raised={current} color={color}>
      {type === TxType.Payment && <PaymentDisplay {...(tx as PaymentTx)} />}
      {type === TxType.DirectDebitAnnouncement && (
        <DirectDebitAnnouncementDisplay
          {...(tx as DirectDebitAnnouncementTx)}
        />
      )}
      {type === TxType.DirectDebitPayment && (
        <DirectDebitPaymentDisplay {...(tx as DirectDebitPaymentTx)} />
      )}
    </Segment>
  )
}
