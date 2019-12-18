import { Request, ResponseToolkit } from 'hapi'

export const createTxn = (request: Request, h: ResponseToolkit) => {
  return h.response('Not Implemented').code(503)
}
