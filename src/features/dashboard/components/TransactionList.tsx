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
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <article
            key={transaction.id}
            className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/6 px-4 py-4"
          >
            <div>
              <p className="font-medium text-white">{transaction.title}</p>
              <p className="mt-1 text-sm text-slate-400">
                {transaction.counterparty} · {formatDate(transaction.createdAt)}
              </p>
            </div>
            <div className="text-right">
              <p
                className={
                  transaction.type === 'credit'
                    ? 'font-semibold text-emerald-300'
                    : 'font-semibold text-orange-200'
                }
              >
                {transaction.type === 'credit' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slate-500">
                {transaction.type}
              </p>
            </div>
          </article>
        ))}
      </div>
    </SectionCard>
  )
}
