import { SimpulatedPayment } from '../../datamodel/core'

const paymentFactory = (payload: SimpulatedPayment) => (overrides: any): SimpulatedPayment => {
  return { ...payload, ...overrides }
}

export { paymentFactory }
