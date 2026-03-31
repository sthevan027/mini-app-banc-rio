import { useMutation } from "@tanstack/react-query";
import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../../services/api";
import { useAuthStore } from "../../../store/auth-store";

export function LoginForm() {
  const [name, setName] = useState("Sthevan");
  const [email, setEmail] = useState("sthevan.dev@bancorio.test");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (user) => {
      login(user);
      void navigate("/");
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loginMutation.mutate({ name, email });
  }

  return (
    <section className="flex items-center rounded-[36px] border border-white/10 bg-slate-950/70 p-8 shadow-2xl backdrop-blur sm:p-10">
      <div className="w-full">
        <p className="text-sm uppercase tracking-[0.35em] text-orange-300/75">
          Acesso
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white">Entrar na conta</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Use qualquer nome e email válidos. O login é mockado, mas a sessão é
          persistida no navegador.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">
              Nome
            </span>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              placeholder="Seu nome"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">
              Email
            </span>
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
              placeholder="voce@email.com"
            />
          </label>

          {loginMutation.isError ? (
            <p className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
              Falha ao iniciar a sessão. Tente novamente.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-wait disabled:opacity-70"
          >
            {loginMutation.isPending ? "Entrando..." : "Acessar dashboard"}
          </button>
        </form>
      </div>
    </section>
  );
}
