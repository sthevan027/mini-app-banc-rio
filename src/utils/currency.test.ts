import { describe, expect, it } from 'vitest'
import { formatCurrency, formatDate } from './currency'
import { DEFAULT_LOCALE } from './i18n'

describe('currency / i18n', () => {
  it('formata moeda no locale padrao', () => {
    expect(formatCurrency(1000.5, DEFAULT_LOCALE)).toMatch(/1\.000,50/)
  })

  it('formata data no locale padrao', () => {
    const s = formatDate('2026-04-02T15:30:00.000Z', DEFAULT_LOCALE)
    expect(s.length).toBeGreaterThan(5)
  })
})
