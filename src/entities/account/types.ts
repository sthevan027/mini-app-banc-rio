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
