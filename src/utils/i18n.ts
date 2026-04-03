/** Locale padrão da aplicação; trocar aqui prepara i18n futuro sem refatorar formatadores. */
export const DEFAULT_LOCALE = 'pt-BR' as const

export type AppLocale = typeof DEFAULT_LOCALE | (string & {})
