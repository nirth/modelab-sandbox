import React from 'react'
import { ApiHealthStatus } from './delegates/ApiHealthStatus'
import { PaymentTxnInitiation } from './InitiatePaymentTxn'

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        Mode Lab Sandbox
        <ApiHealthStatus />
      </header>
      <div>
        <PaymentTxnInitiation />
      </div>
    </div>
  )
}
