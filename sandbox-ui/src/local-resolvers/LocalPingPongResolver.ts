import gql from 'graphql-tag'

const LocalPingPongResolver = {
  Mutation: {
    ping: (_root: any, variables: any, cacheObj: any): string => {
      const { cache } = cacheObj
      console.log('createTxn', variables, cache)

      return 'pong'
    },
  },
}

export { LocalPingPongResolver }
