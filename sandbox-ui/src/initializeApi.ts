// import ApolloClient from 'apollo-boost'

// export const initializeApi = () => {
//   const client: any = new ApolloClient({
//     uri: 'http://localhost:4000',
//   })

//   return client
// }

import ApolloClient from 'apollo-client'
// import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'

// export const initializeApi = () => {
//   return new ApolloClient({
//     link: new WebSocketLink({
//       uri: 'ws://localhost:4000',
//       options: {
//         reconnect: true,
//       },
//     }),
//     cache: new InMemoryCache(),
//   })
// }

import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
})

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000`,
  options: {
    reconnect: true,
  },
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

export const initializeApi = () => {
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })
}
