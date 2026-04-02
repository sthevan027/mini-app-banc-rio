import type { PropsWithChildren } from 'react'
import { useId } from 'react'
import { clsx } from 'clsx'

type SectionCardProps = PropsWithChildren<{
  className?: string
  title: string
  description: string
}>

export function SectionCard({
  title,
  description,
  className,
  children,
}: SectionCardProps) {
  const titleId = useId()
  const descId = useId()

  return (
    <section
      className={clsx(
        'rounded-[var(--app-radius-card)] border border-[var(--app-border-subtle)] bg-[var(--app-surface-elevated)] p-[var(--app-space-section)] shadow-xl backdrop-blur',
        className,
      )}
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <header className="mb-5">
        <h2 id={titleId} className="text-xl font-semibold text-[var(--app-text-primary)]">
          {title}
        </h2>
        <p id={descId} className="mt-1 text-sm text-[var(--app-text-secondary)]">
          {description}
        </p>
      </header>
      {children}
    </section>
  )
}
