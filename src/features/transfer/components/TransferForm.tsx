import type { InputHTMLAttributes, ReactElement, ReactNode } from 'react'
import { cloneElement, isValidElement, useId, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FeedbackBanner } from '../../../components/FeedbackBanner'
import { SectionCard } from '../../../components/SectionCard'
import { formatCurrency } from '../../../utils/currency'
import { useAccountOverviewQuery } from '../../account/hooks/useAccountOverviewQuery'
import { useTransferMutation } from '../hooks/useTransferMutation'
import type {
  TransferFormInput,
  TransferFormValues,
} from '../schemas/transferSchema'
import { transferSchema } from '../schemas/transferSchema'

const inputFocusClass =
  'w-full rounded-[var(--app-radius-control)] border border-[var(--app-border-subtle)] bg-[var(--app-surface-muted)] px-4 py-3 text-[var(--app-text-primary)] outline-none transition placeholder:text-[var(--app-text-muted)] focus-visible:border-cyan-300/50 focus-visible:ring-2 focus-visible:ring-[var(--app-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--app-focus-ring-offset)]'

export function TransferForm() {
  const destinatarioId = useId()
  const valorId = useId()
  const descricaoId = useId()
  const [feedback, setFeedback] = useState<null | {
    kind: 'success' | 'error'
    message: string
  }>(null)
  const { data } = useAccountOverviewQuery()
  const balance = data?.balance ?? 0
  const transferMutation = useTransferMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransferFormInput, undefined, TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      to: '',
      amount: undefined,
      description: '',
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    setFeedback(null)

    try {
      const result = await transferMutation.mutateAsync(values)

      setFeedback({
        kind: 'success',
        message: `Transferencia de ${formatCurrency(result.transaction.amount)} enviada para ${result.transaction.counterparty}.`,
      })
      reset()
    } catch (error) {
      setFeedback({
        kind: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Nao foi possivel concluir a transferencia.',
      })
    }
  })

  return (
    <SectionCard
      title="Nova transferencia"
      description="Validacao de formulario com React Hook Form + Zod e atualizacao do cache remoto."
    >
      <div className="mb-5 rounded-[var(--app-radius-card)] border border-[var(--app-border-subtle)] bg-[var(--app-surface-muted)] p-4">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--app-text-label)]">
          Limite operacional imediato
        </p>
        <p className="mt-2 text-2xl font-semibold text-[var(--app-text-primary)]">
          {formatCurrency(balance)}
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <Field label="Destinatario" fieldId={destinatarioId} error={errors.to?.message}>
          <input
            {...register('to')}
            placeholder="Ex.: Marina Costa"
            autoComplete="name"
            className={inputFocusClass}
          />
        </Field>

        <Field label="Valor" fieldId={valorId} error={errors.amount?.message}>
          <input
            {...register('amount')}
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="0,00"
            className={inputFocusClass}
          />
        </Field>

        <Field label="Descricao" fieldId={descricaoId} error={errors.description?.message}>
          <input
            {...register('description')}
            placeholder="Motivo da transferencia"
            autoComplete="off"
            className={inputFocusClass}
          />
        </Field>

        {feedback ? (
          <FeedbackBanner kind={feedback.kind} message={feedback.message} />
        ) : null}

        <button
          type="submit"
          disabled={transferMutation.isPending}
          className="w-full rounded-[var(--app-radius-pill)] bg-[var(--app-accent-orange-strong)] px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-[var(--app-accent-orange)] disabled:cursor-wait disabled:opacity-70"
        >
          {transferMutation.isPending ? 'Processando...' : 'Transferir agora'}
        </button>
      </form>
    </SectionCard>
  )
}

type FieldProps = {
  label: string
  fieldId: string
  error?: string
  children: ReactNode
}

function Field({ label, error, fieldId, children }: FieldProps) {
  const errorId = `${fieldId}-error`

  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<InputHTMLAttributes<HTMLInputElement>>, {
        id: fieldId,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? errorId : undefined,
      })
    : children

  return (
    <div className="block">
      <label
        htmlFor={fieldId}
        className="mb-2 block text-sm font-medium text-[var(--app-text-secondary)]"
      >
        {label}
      </label>
      {control}
      {error ? (
        <span id={errorId} className="mt-2 block text-sm text-rose-200" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}
