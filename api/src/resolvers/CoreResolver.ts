import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql'
import { HealthStatus } from '../schemas/HealthStatus'
@Resolver()
class CoreResolver {
  @Query(returns => String)
  ping(): string {
    return 'pong'
  }

  @Query(returns => HealthStatus)
  health(): HealthStatus {
    const health = new HealthStatus()
    health.ok = true
    health.status = 'Ok'
    return health
  }
}

export { CoreResolver }
