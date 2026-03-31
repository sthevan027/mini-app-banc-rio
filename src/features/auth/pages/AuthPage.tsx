import { LoginForm } from '../components/LoginForm'

export function AuthPage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-slate-950/55 p-8 shadow-2xl backdrop-blur sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,214,201,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(255,140,92,0.18),transparent_25%)]" />
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/75">
                Mini App Bancário
              </p>
              <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Controle saldo, acompanhe transações e simule transferências com
                feedback imediato.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
                Fluxo pensado para o desafio: autenticação mockada, dashboard com
                dados remotos simulados, validação com Zod e estado compartilhado
                com Zustand.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Metric label="Stack" value="React + TS" />
              <Metric label="Estado" value="Zustand" />
              <Metric label="Requests" value="React Query" />
            </div>
          </div>
        </section>

        <LoginForm />
      </div>
    </main>
  )
}

type MetricProps = {
  label: string
  value: string
}

function Metric({ label, value }: MetricProps) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/6 p-4">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  )
}
