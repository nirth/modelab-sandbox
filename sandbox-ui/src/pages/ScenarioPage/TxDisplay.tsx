import React from 'react'
import { Icon, Label, Header } from 'semantic-ui-react'
import {
  TxType,
  Tx,
  CreditTransferTx,
  DirectDebitAnnouncementTx,
  DirectDebitPaymentTx,
} from '../../sbdk/datamodel'
import { toPrettyDate } from '../../utils'

type TxDisplayProps = {
  tx: Tx
}

const Payment = (props: CreditTransferTx) => {
  const { amount, datetime } = props
  const isIncoming = parseFloat(amount) >= 0
  const color = isIncoming ? 'green' : 'red'
  const icon = isIncoming ? 'angle up' : 'angle down'
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

const DirectDebitAnnouncement = (props: DirectDebitAnnouncementTx) => {
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

const DirectDebitPayment = (props: DirectDebitPaymentTx) => {
  const { amount, datetime } = props
  const prettyDate = toPrettyDate(datetime)

  return (
    <>
      <Header content="Direct Debit Payment" subheader={prettyDate} />
      <Label color="red" style={{ minWidth: '160px' }}>
        <Icon name="angle down" />£{amount}
        <Label.Detail>Direct Debit</Label.Detail>
      </Label>
    </>
  )
}

export const TxDisplay = (props: TxDisplayProps) => {
  const {
    tx,
    tx: { type },
  } = props

  return (
    <>
      {type === TxType.CreditTransfer && (
        <Payment {...(tx as CreditTransferTx)} />
      )}
      {type === TxType.DirectDebitAnnouncement && (
        <DirectDebitAnnouncement {...(tx as DirectDebitAnnouncementTx)} />
      )}
      {type === TxType.DirectDebitPayment && (
        <DirectDebitPayment {...(tx as DirectDebitPaymentTx)} />
      )}
    </>
  )
}
