import { formatCurrency } from '../../../utils/currency'
import { SectionCard } from '../../../components/SectionCard'

type BalanceCardProps = {
  balance: number
}

export function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <SectionCard
      title="Saldo em conta"
      description="Atualizado a partir de uma API mockada com atraso artificial para simular rede."
      className="overflow-hidden"
    >
      <div className="relative overflow-hidden rounded-[28px] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/15 via-slate-900 to-orange-400/10 p-6">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -bottom-10 left-8 h-28 w-28 rounded-full bg-orange-300/20 blur-3xl" />

        <div className="relative">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-100/70">
            Disponivel agora
          </p>
          <p className="mt-4 text-4xl font-bold tracking-tight text-white">
            {formatCurrency(balance)}
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-200/85">
            Transferencias aprovadas atualizam o store global imediatamente e
            depois sincronizam o cache da query.
          </p>
        </div>
      </div>
    </SectionCard>
  )
}
