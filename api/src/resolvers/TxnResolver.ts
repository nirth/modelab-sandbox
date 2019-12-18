import {
  Arg,
  FieldResolver,
  Query,
  Resolver,
  Mutation,
  Root,
  Ctx,
} from 'type-graphql'
import { Context } from 'graphql-yoga/dist/types'
import { pushTxn } from '../txns/txns'
import { FiatTxn } from '../schemas/FiatTxn'
import { FiatCcy } from '../datamodel'

@Resolver()
class TxnResolver {
  @Mutation()
  createFiatTxn(
    @Arg('from') from: string,
    @Arg('counterParty') counterParty: string,
    @Arg('amount') amount: string,
    @Arg('currency') currency: FiatCcy,
    @Ctx() ctx: Context
  ): FiatTxn {
    const txn = pushTxn(from, counterParty, amount, currency)
    return txn
  }
}

export { TxnResolver }
