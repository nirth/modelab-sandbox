import gql from 'graphql-tag'
import { scenarios } from '../assets/payment-scenarios'
import { Scenario } from '../sbdk/datamodel'

const ScenariosTypes = gql`
  enum TxType {
    DIRECT_DEBIT_PAYMENT
    DIRECT_DEBIT_ANNOUNCEMENT
    CREDIT_TRANSFER
  }

  type DirectDebitPaymentTx {
    type: TxType
    datetime: String
    amount: String
    creditorCustomer: String
    creditorBankAccount: String
    sender: String
    receiver: String
    debitorCustomer: String
    debitorBankAccount: String
  }

  type DirectDebitAnnouncementTx {
    type: TxType
    datetime: String
    amount: String
    creditorCustomer: String
    creditorBankAccount: String
    sender: String
    receiver: String
    debitorCustomer: String
    debitorBankAccount: String
  }

  type CreditTransferTx {
    type: TxType
    datetime: String
    amount: String
    creditorCustomer: String
    creditorBankAccount: String
    sender: String
    receiver: String
    debitorCustomer: String
    debitorBankAccount: String
  }

  union Tx = DirectDebitAnnouncementTx | DirectDebitPaymentTx | CreditTransferTx

  type Scenario {
    id: String
    title: String
    description: String
    txs: [Tx]
  }

  type ScenariosResponse {
    scenarios: [Scenario]
  }
`

type ScenariosResponse = Scenario[]
type ScenarioResponse = Scenario | undefined

type ScenarioQueryParams = {
  slug?: string
}

const typePatch = (typename: string) => (item: any) => ({
  ...item,
  __typename: typename,
})

const unionPatch = (unionMap: { [key: string]: string }) => (item: any) => ({
  ...item,
  __typename: unionMap[item.type],
})

const ScenariosResolver = {
  Query: {
    scenarios: (): ScenariosResponse => {
      const scenariosResponse = scenarios.map(typePatch('Scenario'))

      return scenariosResponse
    },
    scenario: (
      _root: any,
      variables: ScenarioQueryParams
    ): ScenarioResponse => {
      const { slug } = variables

      const typedScenario: ScenarioResponse = scenarios
        .filter((scenario: Scenario) => scenario.slug === slug)
        .map(typePatch('Scenario'))
        .pop()

      if (typedScenario) {
        const typedTxs = typedScenario.txs.map(
          unionPatch({
            DIRECT_DEBIT_ANNOUNCEMENT: 'DirectDebitAnnouncementTx',
            DIRECT_DEBIT_PAYMENT: 'DirectDebitPaymentTx',
            CREDIT_TRANSFER: 'CreditTransferTx',
          })
        )
        return {
          ...typedScenario,
          txs: typedTxs,
        }
      }

      throw new Error(`Unable to find scenario for slug: ${slug}`)
    },
  },
  Mutation: {},
}

export { ScenariosResolver, ScenariosTypes }
