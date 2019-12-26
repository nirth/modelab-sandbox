export type HealthStatus = {
  serviceName: string
  serviceId: string
  ok: boolean
  status?: string
  sidecars?: HealthStatus[]
}

export type SimpulatedPayment = {
  datetime: string
  amount: string
  orderingCustomer: string
  orderingBankAccount: string
  sender: string
  receiver: string
  beneficiaryCustomer: string
  beneficiaryBankAccount: string
}

export type Scenario = {
  id: string
  slug: string
  title: string
  description: string
  payments: SimpulatedPayment[]
}

export type Scenarios = Scenario[]
