export const notifyOnLargeDirectDebit = `
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

export const autoInvestSalary = `
onTx((tx) => {
  return true
})

onSalaryPayment((tx) => {
  const {amount} = tx
  const investmentPot = parseFloat(amount) * 0.3
  const mediumRiskInvestment = Math.floor(investmentPot * 0.95).toString()
  const highRiskInvestment = Math.floor(investmentPot * 0.05).toString()

  notify(
    ['NON_URGENT'],
    'Salary Arrived: £' + amount,
    \`Investment pot is \${investmentPot}.
    £\${mediumRiskInvestment} -> ISA.
    £\${highRiskInvestment} -> Bitcoin\`

    
  )

  return true
})
`
