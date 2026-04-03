import type { TransferPayload, TransferResult } from '../../../entities/transfer/types'
import {
  getAccountOverviewSnapshot,
  setAccountOverviewSnapshot,
  simulateRequest,
} from '../../../shared/api/mock-server'

export async function transferFunds(
  payload: TransferPayload,
): Promise<TransferResult> {
  const snapshot = getAccountOverviewSnapshot()
  const amount = Number(payload.amount)

  if (amount > snapshot.balance) {
    throw new Error('Saldo insuficiente para concluir a transferencia.')
  }

  const transaction = {
    id: `txn-${Date.now()}`,
    title: payload.description,
    counterparty: payload.to.trim(),
    amount,
    type: 'debit' as const,
    createdAt: new Date().toISOString(),
  }

  const nextSnapshot = {
    balance: Number((snapshot.balance - amount).toFixed(2)),
    transactions: [transaction, ...snapshot.transactions],
  }

  setAccountOverviewSnapshot(nextSnapshot)

  return simulateRequest(
    {
      balance: nextSnapshot.balance,
      transaction,
    },
    900,
  )
}
