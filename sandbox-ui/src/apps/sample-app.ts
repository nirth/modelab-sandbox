import { Tx } from '../sbdk/datamodel'
import { CompiledApp } from '../datamodel/marketplace'

export const emptyApp: CompiledApp = (tx: Tx) => [true, []]

export const sampleAppCode = `
onTx((tx) => {
  return true
})

onDirectDebitAnnouncement((tx) => {
  const {creditorCustomer, amount} = tx
  if (tx.amount > 500) {
    notify(
      ['PREFERRED', 'EMAIL'],
      'Abnormaly High Direct Debit',
      'Direct Debit from '
      + creditorCustomer
      + ' is abnormaly high at '
      + amount
      + '.'
    )
  } 
  return true
})


onDirectDebitPayment((tx) => {
  const {amount} = tx
  if (tx.amount > 500) {
    return false
  } 
  return true
})

`
