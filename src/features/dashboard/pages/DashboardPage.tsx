import { lazy, Suspense, useEffect, useRef } from 'react'
import { AppShell } from '../../../components/AppShell'
import { FeedbackBanner } from '../../../components/FeedbackBanner'
import { SectionCard } from '../../../components/SectionCard'
import {
  markDashboardDataReady,
  reportUiError,
  startDashboardLoadMark,
} from '../../../utils/observability'
import { useAccountOverviewQuery } from '../../account/hooks/useAccountOverviewQuery'
import { BalanceCard } from '../components/BalanceCard'
import { SummaryMetricCard } from '../components/SummaryMetricCard'
import { TransactionList } from '../components/TransactionList'

const TransferForm = lazy(() =>
  import('../../transfer/components/TransferForm').then((m) => ({ default: m.TransferForm })),
)

export function DashboardPage() {
  const overviewQuery = useAccountOverviewQuery()
  const balance = overviewQuery.data?.balance ?? 0
  const transactions = overviewQuery.data?.transactions ?? []
  const hasMarkedReady = useRef(false)

  useEffect(() => {
    startDashboardLoadMark()
  }, [])

  useEffect(() => {
    if (overviewQuery.isError) {
      reportUiError(new Error('Falha ao carregar visao geral da conta'), 'dashboard_overview')
    }
  }, [overviewQuery.isError])

  useEffect(() => {
    if (
      overviewQuery.isLoading ||
      overviewQuery.isError ||
      !overviewQuery.data ||
      hasMarkedReady.current
    ) {
      return
    }
    hasMarkedReady.current = true
    markDashboardDataReady()
  }, [overviewQuery.isLoading, overviewQuery.isError, overviewQuery.data])

  return (
    <AppShell balance={balance}>
      {overviewQuery.isLoading ? (
        <div
          className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"
          aria-busy="true"
          aria-live="polite"
        >
          <span className="sr-only">Carregando dados da conta</span>
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : null}

      {overviewQuery.isError ? (
        <FeedbackBanner
          kind="error"
          message="Nao foi possivel carregar os dados da conta. Recarregue a pagina."
        />
      ) : null}

      {!overviewQuery.isLoading && !overviewQuery.isError ? (
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <BalanceCard balance={balance} />

            <SectionCard
              title="Resumo operacional"
              description="Informacoes sinteticas para deixar claro o estado atual da conta."
            >
              <div className="grid gap-4 sm:grid-cols-3">
                <SummaryMetricCard
                  label="Transacoes"
                  value={String(transactions.length).padStart(2, '0')}
                />
                <SummaryMetricCard label="Status" value="Conta ativa" />
                <SummaryMetricCard label="Protecao" value="Sessao local" />
              </div>
            </SectionCard>

            <Suspense fallback={<TransferFormSkeleton />}>
              <TransferForm />
            </Suspense>
          </div>

          <TransactionList transactions={transactions} />
        </div>
      ) : null}
    </AppShell>
  )
}

function SkeletonCard() {
  return (
    <div
      className="h-80 animate-pulse rounded-[var(--app-radius-card)] border border-[var(--app-border-subtle)] bg-[var(--app-surface-muted)]"
      aria-hidden
    />
  )
}

function TransferFormSkeleton() {
  return (
    <div
      className="min-h-[22rem] animate-pulse rounded-[var(--app-radius-card)] border border-[var(--app-border-subtle)] bg-[var(--app-surface-muted)]"
      role="status"
      aria-label="Carregando formulario de transferencia"
    />
  )
}
