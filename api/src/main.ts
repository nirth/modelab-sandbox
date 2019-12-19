import { GraphQLServer } from 'graphql-yoga'
import 'reflect-metadata'
import { buildSchema, registerEnumType } from 'type-graphql'
import { CoreResolver } from './resolvers/CoreResolver'
import { TxnResolver } from './resolvers/TxnResolver'
import { FiatCcy, FiatTxnStatus } from './datamodel'

registerEnumType(FiatCcy, {
  name: 'FiatCcy',
  description: `
  Supported by platform fiat currencies in a form of ISO4217:
    * EUR for Euro
    * GBP for British Pound
    * USD for United States Dollar
    * etc.
  `,
})

registerEnumType(FiatTxnStatus, {
  name: 'FiatTxnStatus',
  description: `
  Indicates status of the fiat payment transaction:
  * Created: Transaction created.
  * Initiated: Transaction initiated.
  * Executed: Transaction executed.
  * Cleared: Transaction cleared.
  * Settled: Transaction settled, and everybody happy.
  * Declined: Something went wrong, and transaction was declined.
  `,
})

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [CoreResolver, TxnResolver],
    emitSchemaFile: true,
  })

  const server = new GraphQLServer({
    schema,
  })

  server.start((...rest) =>
    console.log('Server is running on http://localhost:4000', rest[0])
  )
}

bootstrap()
