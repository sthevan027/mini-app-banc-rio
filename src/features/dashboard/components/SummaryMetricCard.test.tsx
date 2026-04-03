import { screen } from '@testing-library/react'
import { SummaryMetricCard } from './SummaryMetricCard'
import { renderWithProviders } from '../../../test/render'

describe('SummaryMetricCard', () => {
  it('renderiza label e valor', () => {
    renderWithProviders(<SummaryMetricCard label="Status" value="Ativa" />)

    expect(screen.getByRole('group', { name: 'Status' })).toBeInTheDocument()
    expect(screen.getByText('Ativa')).toBeInTheDocument()
  })
})
