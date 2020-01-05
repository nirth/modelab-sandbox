import ApolloClient from 'apollo-client'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { HealthResolver } from './local-resolvers/HealthResolver'
import {
  ScenariosResolver,
  ScenariosTypes,
} from './local-resolvers/ScenariosResolver'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'UNION',
          name: 'Tx',
          possibleTypes: [
            {
              name: 'PaymentTx',
            },
            {
              name: 'DirectDebitAnnouncementTx',
            },
            {
              name: 'DirectDebitPaymentTx',
            },
          ],
        },
      ],
    },
  },
})

export const initializeApi = () => {
  return new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher }),
    typeDefs: [ScenariosTypes],
    resolvers: [HealthResolver, ScenariosResolver],
  })
}
