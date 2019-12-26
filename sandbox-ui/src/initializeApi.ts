import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HealthResolver } from './local-resolvers/HealthResolver'
import { ScenariosResolver, ScenariosTypes } from './local-resolvers/ScenariosResolver'

export const initializeApi = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    typeDefs: [ScenariosTypes],
    resolvers: [HealthResolver, ScenariosResolver],
  })
}
