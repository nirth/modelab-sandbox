import { HealthStatus } from '../datamodel/core'

const HealthResolver = {
  Query: {
    health: (_root: any, variables: any, cacheObj: any): HealthStatus => {
      console.log('HealthResolver.health')
      const healthStatus = {
        __typename: 'HealthStatus',
        serviceName: 'LocalClient',
        serviceId: 'default',
        ok: true,
      }

      return healthStatus
    },
  },
  Mutation: {},
}

export { HealthResolver }
