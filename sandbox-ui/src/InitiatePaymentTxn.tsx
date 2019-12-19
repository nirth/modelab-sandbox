import React, { useState } from 'react'
import { Form, FormInput, Segment, List } from 'semantic-ui-react'
import { useMutation, useSubscription } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const createFiatTxnMutation = gql`
  mutation CreateFiatTxn($counterParty: String!, $amount: String!) {
    createFiatTxn(
      from: "Alice"
      counterParty: $counterParty
      amount: $amount
      ccy: "GBP"
    ) {
      internalId
      createdAt
    }
  }
`

const fiatTxnProcessingSubscription = gql`
  subscription {
    fiatTxnProcessing {
      internalId
      status
      from
      counterParty
      amount
      currency
    }
  }
`

const handleChange = (previousState: any, setFormState: any) => (
  event: any,
  { name, value }: any
) =>
  setFormState({
    ...previousState,
    [name]: value,
  })

const handleSubmit = (
  formState: any,
  setFormState: any,
  createFiatTxn: any
) => () => {
  const { amount, counterParty } = formState
  console.log('counterParty:', counterParty, 'amount:', amount)
  createFiatTxn({ variables: { counterParty, amount } })
  // setFormState({
  //   amount: '',
  //   counterParty: '',
  // })
}

const txnReports = []

const PaymentTxnInitiation = (props: any) => {
  const [formState, setFormState] = useState({
    amount: '',
    counterParty: '',
  })

  const [
    createFiatTxn,
    { loading: mutationLoading, error: mutationError, data },
  ] = useMutation(createFiatTxnMutation)

  const { data: txnReport } = useSubscription(fiatTxnProcessingSubscription)

  if (txnReport !== undefined) {
    txnReports.push(txnReport)
  }

  if (mutationLoading === true) {
    return <div>Loading</div>
  }

  if (mutationError) {
    return <div>{JSON.stringify(mutationError)}</div>
  }

  const status =
    data === undefined ? null : <span>Txn Created {JSON.stringify(data)}</span>

  return (
    <Segment>
      <Form onSubmit={handleSubmit(formState, setFormState, createFiatTxn)}>
        <Form.Group>
          <FormInput
            placeholder="Amount"
            name="amount"
            value={formState.amount}
            onChange={handleChange(formState, setFormState)}
          />
          <FormInput
            placeholder="Counter Party"
            name="counterParty"
            value={formState.counterParty}
            onChange={handleChange(formState, setFormState)}
          />
          <Form.Button content="Submit" />
        </Form.Group>
      </Form>
      {status}
      {/* <List divided inverted relaxed>
        {txnReports.map((txnReport: any) => (
          <List.Item>
            <List.Content>{JSON.stringify(txnReport)}</List.Content>
          </List.Item>
        ))}
      </List> */}
    </Segment>
  )
}

export { PaymentTxnInitiation }
