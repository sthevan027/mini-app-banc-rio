import type { PropsWithChildren } from "react";
import { useLogout } from "../features/auth/hooks/useLogout";
import { useAuthStore } from "../store/auth-store";
import { formatCurrency } from "../utils/currency";

type AppShellProps = PropsWithChildren<{
  balance: number;
}>;

export function AppShell({ balance, children }: AppShellProps) {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  return (
    <main
      className="min-h-screen px-4 py-6 text-[var(--app-text-secondary)] sm:px-6 lg:px-10"
      id="main-content"
    >
      <div className="mx-auto flex w-full max-w-[var(--app-max-content)] flex-col gap-6">
        <header className="overflow-hidden rounded-4xl border border-[var(--app-border-subtle)] bg-[var(--app-surface-elevated)] shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-6 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--app-accent-cyan-muted)]">
                Banc Rio
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--app-text-primary)] sm:text-4xl">
                Painel de conta
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-[var(--app-text-secondary)] sm:text-base">
                Sessao mockada para {user?.name}. A aplicacao separa
                autenticacao, API por dominio, cache remoto e validacao de
                formulario.
              </p>
            </div>

            <div
              className="flex flex-col gap-4 rounded-[var(--app-radius-card)] border border-cyan-400/25 bg-cyan-400/10 p-5 sm:min-w-72"
              aria-label="Resumo de saldo e sessao"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/80">
                  Saldo disponivel
                </p>
                <p
                  className="mt-2 text-3xl font-bold text-[var(--app-text-primary)]"
                  aria-live="polite"
                >
                  {formatCurrency(balance)}
                </p>
              </div>

              <button
                type="button"
                onClick={logout}
                className="rounded-[var(--app-radius-pill)] border border-[var(--app-border-subtle)] bg-[var(--app-surface-muted)] px-4 py-2 text-sm font-medium text-[var(--app-text-primary)] transition hover:bg-white/14"
              >
                Encerrar sessao
              </button>
            </div>
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}
