import { AppShell } from '../../../components/AppShell'
import { FeedbackBanner } from '../../../components/FeedbackBanner'
import { SectionCard } from '../../../components/SectionCard'
import { useAccountOverviewQuery } from '../../account/hooks/useAccountOverviewQuery'
import { TransferForm } from '../../transfer/components/TransferForm'
import { BalanceCard } from '../components/BalanceCard'
import { TransactionList } from '../components/TransactionList'

export function DashboardPage() {
  const overviewQuery = useAccountOverviewQuery()
  const balance = overviewQuery.data?.balance ?? 0
  const transactions = overviewQuery.data?.transactions ?? []

  return (
    <AppShell balance={balance}>
      {overviewQuery.isLoading ? (
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
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
                <SummaryMetric
                  label="Transacoes"
                  value={String(transactions.length).padStart(2, '0')}
                />
                <SummaryMetric label="Status" value="Conta ativa" />
                <SummaryMetric label="Protecao" value="Sessao local" />
              </div>
            </SectionCard>

            <TransferForm />
          </div>

          <TransactionList transactions={transactions} />
        </div>
      ) : null}
    </AppShell>
  )
}

function SummaryMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/6 p-4">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="h-80 animate-pulse rounded-[28px] border border-white/10 bg-white/6" />
  )
}
