import { HealthStatus } from '../sbdk/datamodel'

const HealthResolver = {
  Query: {
    health: (_root: any, variables: any, cacheObj: any): HealthStatus => {
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
