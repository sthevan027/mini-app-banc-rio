import type { ReactNode } from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FeedbackBanner } from "../../../components/FeedbackBanner";
import { SectionCard } from "../../../components/SectionCard";
import { transferFunds } from "../../../services/api";
import { useBankStore } from "../../../store/bank-store";
import { formatCurrency } from "../../../utils/currency";
import type {
  TransferFormInput,
  TransferFormValues,
} from "../schemas/transferSchema";
import { transferSchema } from "../schemas/transferSchema";

export function TransferForm() {
  const [feedback, setFeedback] = useState<null | {
    kind: "success" | "error";
    message: string;
  }>(null);
  const balance = useBankStore((state) => state.balance);
  const applyTransfer = useBankStore((state) => state.applyTransfer);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransferFormInput, undefined, TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      to: "",
      amount: undefined,
      description: "",
    },
  });

  const transferMutation = useMutation({
    mutationFn: transferFunds,
    onSuccess: (result) => {
      applyTransfer(result);
      setFeedback({
        kind: "success",
        message: `Transferencia de ${formatCurrency(result.transaction.amount)} enviada para ${result.transaction.counterparty}.`,
      });
      reset();
      void queryClient.invalidateQueries({ queryKey: ["account-overview"] });
    },
    onError: (error) => {
      setFeedback({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Nao foi possivel concluir a transferencia.",
      });
    },
  });

  const onSubmit = handleSubmit((values: TransferFormValues) => {
    setFeedback(null);
    transferMutation.mutate(values);
  });

  return (
    <SectionCard
      title="Nova transferencia"
      description="Validacao de formulario com React Hook Form + Zod e atualizacao do estado global."
    >
      <div className="mb-5 rounded-3xl border border-white/10 bg-white/6 p-4">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
          Limite operacional imediato
        </p>
        <p className="mt-2 text-2xl font-semibold text-white">
          {formatCurrency(balance)}
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <Field label="Destinatario" error={errors.to?.message}>
          <input
            {...register("to")}
            placeholder="Ex.: Marina Costa"
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
          />
        </Field>

        <Field label="Valor" error={errors.amount?.message}>
          <input
            {...register("amount")}
            type="number"
            min="0"
            step="0.01"
            placeholder="0,00"
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
          />
        </Field>

        <Field label="Descricao" error={errors.description?.message}>
          <input
            {...register("description")}
            placeholder="Motivo da transferencia"
            className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
          />
        </Field>

        {feedback ? (
          <FeedbackBanner kind={feedback.kind} message={feedback.message} />
        ) : null}

        <button
          type="submit"
          disabled={transferMutation.isPending}
          className="w-full rounded-full bg-orange-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-orange-200 disabled:cursor-wait disabled:opacity-70"
        >
          {transferMutation.isPending ? "Processando..." : "Transferir agora"}
        </button>
      </form>
    </SectionCard>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

function Field({ label, error, children }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-2 block text-sm text-rose-200">{error}</span>
      ) : null}
    </label>
  );
}
