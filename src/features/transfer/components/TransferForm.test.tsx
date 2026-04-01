import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { accountKeys } from '../../account/api/accountKeys'
import { fetchAccountOverview } from '../../account/api/fetchAccountOverview'
import { TransferForm } from './TransferForm'
import { renderWithProviders } from '../../../test/render'
import { resetMockServer } from '../../../shared/api/mock-server'

describe('TransferForm', () => {
  beforeEach(() => {
    resetMockServer()
  })

  it('submits a transfer and updates the displayed balance', async () => {
    const user = userEvent.setup()
    const { queryClient } = renderWithProviders(<TransferForm />)

    await queryClient.prefetchQuery({
      queryKey: accountKeys.overview(),
      queryFn: fetchAccountOverview,
    })

    await user.type(screen.getByLabelText('Destinatario'), 'Marina Costa')
    await user.type(screen.getByLabelText('Valor'), '150')
    await user.type(screen.getByLabelText('Descricao'), 'Reserva de viagem')
    await user.click(screen.getByRole('button', { name: 'Transferir agora' }))

    expect(
      await screen.findByText(
        /Transferencia de R\$ 150,00 enviada para Marina Costa./i,
      ),
    ).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/12\.300,90/)).toBeInTheDocument()
    })
  })
})
