export type UserSession = {
  id: string
  name: string
  email: string
}

export type LoginPayload = Pick<UserSession, 'name' | 'email'>

export type Transaction = {
  id: string
  title: string
  counterparty: string
  amount: number
  type: 'credit' | 'debit'
  createdAt: string
}

export type AccountOverview = {
  balance: number
  transactions: Transaction[]
}

export type TransferPayload = {
  to: string
  amount: number
  description: string
}

export type TransferResult = {
  balance: number
  transaction: Transaction
}
