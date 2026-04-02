import { screen } from '@testing-library/react'
import { BalanceCard } from './BalanceCard'
import { renderWithProviders } from '../../../test/render'

describe('BalanceCard', () => {
  it('exibe saldo formatado e regiao acessivel', () => {
    renderWithProviders(<BalanceCard balance={1234.56} />)

    expect(screen.getByRole('region', { name: /saldo disponivel na conta/i })).toBeInTheDocument()
    expect(screen.getByText('R$ 1.234,56')).toBeInTheDocument()
  })
})
