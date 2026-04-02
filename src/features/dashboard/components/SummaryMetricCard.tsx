type SummaryMetricCardProps = {
  label: string
  value: string
}

/**
 * Cartão de métrica do resumo operacional (dashboard).
 */
export function SummaryMetricCard({ label, value }: SummaryMetricCardProps) {
  return (
    <div
      className="rounded-[var(--app-radius-card)] border border-[var(--app-border-subtle)] bg-[var(--app-surface-muted)] p-[var(--app-space-card-inner)]"
      role="group"
      aria-label={label}
    >
      <p className="text-xs uppercase tracking-[0.25em] text-[var(--app-text-label)]">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-[var(--app-text-primary)]">{value}</p>
    </div>
  )
}
