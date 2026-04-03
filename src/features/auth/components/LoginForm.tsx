import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FeedbackBanner } from '../../../components/FeedbackBanner'
import { useLoginMutation } from '../hooks/useLoginMutation'
import type { LoginFormInput, LoginFormValues } from '../schemas/loginSchema'
import { loginSchema } from '../schemas/loginSchema'

export function LoginForm() {
  const loginMutation = useLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput, undefined, LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: 'Sthevan',
      email: 'sthevan.dev@bancorio.test',
    },
  })

  const onSubmit = handleSubmit((values) => {
    loginMutation.mutate(values)
  })

  return (
    <section className="flex items-center rounded-[36px] border border-white/10 bg-slate-950/70 p-8 shadow-2xl backdrop-blur sm:p-10">
      <div className="w-full">
        <p className="text-sm uppercase tracking-[0.35em] text-orange-300/75">
          Acesso
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white">Entrar na conta</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Use qualquer nome e email validos. O login e mockado, mas a sessao e
          persistida no navegador.
        </p>

        <form className="mt-8 space-y-5" onSubmit={onSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">
              Nome
            </span>
            <input
              {...register('name')}
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              placeholder="Seu nome"
            />
            {errors.name ? (
              <span className="mt-2 block text-sm text-rose-200">{errors.name.message}</span>
            ) : null}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">
              Email
            </span>
            <input
              {...register('email')}
              type="email"
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              placeholder="voce@email.com"
            />
            {errors.email ? (
              <span className="mt-2 block text-sm text-rose-200">{errors.email.message}</span>
            ) : null}
          </label>

          {loginMutation.isError ? (
            <FeedbackBanner
              kind="error"
              message={
                loginMutation.error instanceof Error
                  ? loginMutation.error.message
                  : 'Falha ao iniciar a sessao. Tente novamente.'
              }
            />
          ) : null}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-wait disabled:opacity-70"
          >
            {loginMutation.isPending ? 'Entrando...' : 'Acessar dashboard'}
          </button>
        </form>
      </div>
    </section>
  )
}
