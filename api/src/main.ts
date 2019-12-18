import hapi, { Server, Request, ResponseToolkit } from 'hapi'
import { initTxnsResource } from './txns/txns'

const host = 'localhost'
const port = 3333

const server: Server = new hapi.Server({
  host,
  port,
})

initTxnsResource(server)

async function start() {
  try {
    await server.start()
  } catch (error) {
    console.error('Error:', error)
  }

  console.info(`RESTful API is Running on ${host}:${port}`)
}

start()
