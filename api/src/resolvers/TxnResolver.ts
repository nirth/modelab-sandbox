import {
  Arg,
  Resolver,
  Mutation,
  Ctx,
  PubSub,
  Publisher,
  Subscription,
  Root,
  PubSubEngine,
} from 'type-graphql'
import { Context } from 'graphql-yoga/dist/types'
import { pushTxn } from '../txns/txns'
import { FiatTxn } from '../schemas/FiatTxn'
import { FiatCcy, IFiatTxn, FiatTxnStatus } from '../datamodel'
import uuid = require('uuid')

const pause = (value: any, duration: number) =>
  new Promise(resolve => {
    setTimeout(() => resolve(value), duration)
  })

@Resolver()
class TxnResolver {
  @Mutation()
  createFiatTxn(
    @PubSub() pubSub: PubSubEngine,
    @Arg('from') from: string,
    @Arg('counterParty') counterParty: string,
    @Arg('amount') amount: string,
    @Arg('ccy') ccy: FiatCcy,
    @Ctx() ctx: Context
  ): FiatTxn {
    const txn = pushTxn(from, counterParty, amount, ccy)
    pubSub
      .publish('PAYMENT_TRANSACTIONS', txn)
      .then(() => {
        txn.status = FiatTxnStatus.Initiated
        return pubSub.publish('PAYMENT_TRANSACTIONS', txn)
      })
      .then(() => pause(txn, 500))
      .then(() => {
        txn.status = FiatTxnStatus.Executed
        return pubSub.publish('PAYMENT_TRANSACTIONS', txn)
      })
      .then(() => pause(txn, 500))
      .then(() => {
        txn.status = FiatTxnStatus.Cleared
        return pubSub.publish('PAYMENT_TRANSACTIONS', txn)
      })
      .then(() => pause(txn, 500))
      .then(() => {
        txn.status = FiatTxnStatus.Settled
        return pubSub.publish('PAYMENT_TRANSACTIONS', txn)
      })

    return txn
  }

  @Subscription(returns => FiatTxn, { topics: 'PAYMENT_TRANSACTIONS' })
  fiatTxnProcessing(@Root() fiatTxn: IFiatTxn): IFiatTxn {
    return fiatTxn
  }
}

export { TxnResolver }
