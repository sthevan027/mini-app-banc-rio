import { screen } from '@testing-library/react'
import { TransactionList } from './TransactionList'
import type { Transaction } from '../../../entities/account/types'
import { renderWithProviders } from '../../../test/render'

const sample: Transaction[] = [
  {
    id: 't1',
    title: 'Pix recebido',
    counterparty: 'Ana',
    amount: 50,
    type: 'credit',
    createdAt: '2026-03-30T12:00:00.000Z',
  },
]

describe('TransactionList', () => {
  it('lista transacoes com valores acessiveis', () => {
    renderWithProviders(<TransactionList transactions={sample} />)

    expect(screen.getByRole('list', { name: /ultimas transacoes/i })).toBeInTheDocument()
    expect(screen.getByText('Pix recebido')).toBeInTheDocument()
    expect(screen.getByText(/Credito de/)).toBeInTheDocument()
  })

  it('mostra estado vazio quando nao ha transacoes', () => {
    renderWithProviders(<TransactionList transactions={[]} />)

    expect(screen.getByText(/Nenhuma transacao para exibir/i)).toBeInTheDocument()
  })
})
