import type { AccountOverview } from '../../entities/account/types'

const initialAccountOverview: AccountOverview = {
  balance: 12450.9,
  transactions: [
    {
      id: 'txn-003',
      title: 'Pagamento de conta',
      counterparty: 'Concessionaria Rio Energia',
      amount: 320.45,
      type: 'debit',
      createdAt: '2026-03-31T17:15:00.000Z',
    },
    {
      id: 'txn-002',
      title: 'Transferencia recebida',
      counterparty: 'Lucas Almeida',
      amount: 880,
      type: 'credit',
      createdAt: '2026-03-30T13:20:00.000Z',
    },
    {
      id: 'txn-001',
      title: 'Compra no cartao',
      counterparty: 'Mercado Centro',
      amount: 142.87,
      type: 'debit',
      createdAt: '2026-03-29T09:12:00.000Z',
    },
  ],
}

let accountOverview = structuredClone(initialAccountOverview)

export function simulateRequest<T>(payload: T, delay = 650): Promise<T> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(structuredClone(payload)), delay)
  })
}

export function getAccountOverviewSnapshot() {
  return accountOverview
}

export function setAccountOverviewSnapshot(snapshot: AccountOverview) {
  accountOverview = snapshot
}

export function resetMockServer() {
  accountOverview = structuredClone(initialAccountOverview)
}
