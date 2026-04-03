import { DEFAULT_LOCALE, type AppLocale } from './i18n'

export function formatCurrency(value: number, locale: AppLocale = DEFAULT_LOCALE) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDate(value: string, locale: AppLocale = DEFAULT_LOCALE) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))
}
