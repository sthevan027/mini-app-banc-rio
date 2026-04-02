const DASHBOARD_MARK = 'app:dashboard:ready'

/**
 * Marca tempo até dados do dashboard estarem prontos (Performance API).
 * Útil para métricas reais; em dev também registra no console.
 */
export function markDashboardDataReady() {
  if (typeof performance === 'undefined' || !performance.mark) return

  try {
    performance.mark(`${DASHBOARD_MARK}:end`)
    performance.measure(
      'dashboard_data_ready',
      `${DASHBOARD_MARK}:start`,
      `${DASHBOARD_MARK}:end`,
    )
  } catch {
    performance.mark(`${DASHBOARD_MARK}:end`)
  }

  if (import.meta.env.DEV) {
    const entries = performance.getEntriesByName('dashboard_data_ready', 'measure')
    const last = entries[entries.length - 1]
    if (last) {
      console.debug('[observability] dashboard_data_ready ms=', Math.round(last.duration))
    }
  }
}

export function startDashboardLoadMark() {
  if (typeof performance === 'undefined' || !performance.mark) return
  try {
    performance.mark(`${DASHBOARD_MARK}:start`)
  } catch {
    /* ignore */
  }
}

/** Erros de UI para correlacionar com monitoramento (ex.: Sentry) sem vazar PII. */
export function reportUiError(error: unknown, context: string) {
  if (import.meta.env.DEV) {
    console.error(`[observability] ${context}`, error)
  }
  if (typeof window !== 'undefined' && 'dispatchEvent' in window) {
    window.dispatchEvent(
      new CustomEvent('app:ui-error', {
        detail: { context, message: error instanceof Error ? error.message : String(error) },
      }),
    )
  }
}
