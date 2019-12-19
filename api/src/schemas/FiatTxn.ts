import { Field, ObjectType } from 'type-graphql'
import { IFiatTxn, FiatCcy } from '../datamodel'

@ObjectType()
class FiatTxn implements IFiatTxn {
  @Field()
  internalId: string

  @Field()
  status: string

  @Field()
  amount: string

  @Field()
  from: string

  /**
   * CounterParty indicates the destination (other party) of the payment transaction.
   */
  @Field()
  counterParty: string

  @Field(type => FiatCcy)
  currency: FiatCcy

  @Field()
  createdAt: string
}

export { FiatTxn }
