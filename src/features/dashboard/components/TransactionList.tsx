import { SectionCard } from '../../../components/SectionCard'
import type { Transaction } from '../../../entities/account/types'
import { formatCurrency, formatDate } from '../../../utils/currency'

type TransactionListProps = {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <SectionCard
      title="Ultimas transacoes"
      description="Historico recente para acompanhar entradas e saidas da conta."
    >
      {transactions.length === 0 ? (
        <p className="rounded-[var(--app-radius-control)] border border-dashed border-[var(--app-border-subtle)] bg-[var(--app-surface-muted)] px-4 py-8 text-center text-sm text-[var(--app-text-muted)]">
          Nenhuma transacao para exibir no momento.
        </p>
      ) : (
        <ul
          className="list-none space-y-3 p-0"
          aria-label="Lista das ultimas transacoes"
        >
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <article
                className="flex items-center justify-between rounded-[var(--app-radius-card)] border border-[var(--app-border-subtle)] bg-[var(--app-surface-muted)] px-4 py-4"
              >
                <div>
                  <p className="font-medium text-[var(--app-text-primary)]">
                    {transaction.title}
                  </p>
                  <p className="mt-1 text-sm text-[var(--app-text-muted)]">
                    {transaction.counterparty} · {formatDate(transaction.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={
                      transaction.type === 'credit'
                        ? 'font-semibold text-[var(--app-credit)]'
                        : 'font-semibold text-[var(--app-debit)]'
                    }
                  >
                    <span className="sr-only">
                      {transaction.type === 'credit' ? 'Credito' : 'Debito'} de{' '}
                    </span>
                    {transaction.type === 'credit' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.25em] text-[var(--app-text-label)]">
                    {transaction.type}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  )
}
