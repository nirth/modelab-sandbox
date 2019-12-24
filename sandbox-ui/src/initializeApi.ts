import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HealthResolver } from './local-resolvers/HealthResolver'

export const initializeApi = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    resolvers: [HealthResolver],
  })
}
