import { SectionCard } from "../../../components/SectionCard";
import { formatCurrency } from "../../../utils/currency";

type BalanceCardProps = {
  balance: number;
};

export function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <SectionCard
      title="Saldo em conta"
      description="Atualizado a partir de uma API mockada com atraso artificial para simular rede."
      className="overflow-hidden"
    >
      <div
        className="relative overflow-hidden rounded-[var(--app-radius-card)] border border-cyan-400/25 bg-linear-to-br from-cyan-400/15 via-slate-900 to-orange-400/10 p-6"
        role="region"
        aria-label="Saldo disponivel na conta"
      >
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-300/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-10 left-8 h-28 w-28 rounded-full bg-orange-300/20 blur-3xl" aria-hidden />

        <div className="relative">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-100/80">
            Disponivel agora
          </p>
          <p
            className="mt-4 text-4xl font-bold tracking-tight text-[var(--app-text-primary)]"
            aria-live="polite"
          >
            {formatCurrency(balance)}
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-[var(--app-text-secondary)]">
            Transferencias aprovadas atualizam o cache remoto imediatamente,
            mantendo uma unica fonte de verdade para a conta.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}
