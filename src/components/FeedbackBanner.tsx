import { clsx } from 'clsx'

type FeedbackBannerProps = {
  kind: 'success' | 'error'
  message: string
}

export function FeedbackBanner({ kind, message }: FeedbackBannerProps) {
  return (
    <div
      role="status"
      className={clsx(
        'rounded-2xl border px-4 py-3 text-sm',
        kind === 'success'
          ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100'
          : 'border-rose-400/30 bg-rose-400/10 text-rose-100',
      )}
    >
      {message}
    </div>
  )
}
