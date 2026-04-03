import type { Transaction } from '../account/types'

export type TransferPayload = {
  to: string
  amount: number
  description: string
}

export type TransferResult = {
  balance: number
  transaction: Transaction
}
