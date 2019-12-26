import gql from 'graphql-tag'
import { scenarios } from '../assets/payment-scenarios'
import { Scenario } from '../datamodel/core'

const ScenariosTypes = gql`
  type SimpulatedPayment {
    datetime: String
    amount: String
    orderingCustomer: String
    orderingBankAccount: String
    sender: String
    receiver: String
    beneficiaryCustomer: String
    beneficiaryBankAccount: String
  }

  type Scenario {
    id: String
    title: String
    description: String
    payments: [SimpulatedPayment]
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

      const scenario: ScenarioResponse = scenarios
        .filter((scenario: Scenario) => scenario.slug === slug)
        .map(typePatch('Scenario'))
        .pop()

      return scenario
    },
  },
  Mutation: {},
}

export { ScenariosResolver, ScenariosTypes }
