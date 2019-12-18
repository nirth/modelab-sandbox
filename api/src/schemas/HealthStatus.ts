import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class HealthStatus {
  @Field()
  status: string

  @Field()
  ok: boolean
}

export { HealthStatus }
