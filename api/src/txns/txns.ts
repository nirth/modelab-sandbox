import { Server } from 'hapi'
import { createTxn } from './createTxn'

export const initTxnsResource = (server: Server) => {
  server.route({
    method: 'POST',
    path: '/txns',
    handler: createTxn,
  })
}
