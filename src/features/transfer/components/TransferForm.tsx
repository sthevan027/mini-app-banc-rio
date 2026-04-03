import type { InputHTMLAttributes } from "react";
import { useId, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { clsx } from "clsx";
import { FeedbackBanner } from "../../../components/FeedbackBanner";
import { SectionCard } from "../../../components/SectionCard";
import { formatCurrency } from "../../../utils/currency";
import { useAccountOverviewQuery } from "../../account/hooks/useAccountOverviewQuery";
import { useTransferMutation } from "../hooks/useTransferMutation";
import type {
  TransferFormInput,
  TransferFormValues,
} from "../schemas/transferSchema";
import { transferSchema } from "../schemas/transferSchema";

const inputFocusClass =
  "w-full rounded-(--app-radius-control) border border-(--app-border-subtle) bg-(--app-surface-muted) px-4 py-3 text-(--app-text-primary) outline-none transition placeholder:text-(--app-text-muted) focus-visible:border-cyan-300/50 focus-visible:ring-2 focus-visible:ring-(--app-focus-ring) focus-visible:ring-offset-2 focus-visible:ring-offset-(--app-focus-ring-offset)";

export function TransferForm() {
  const destinatarioId = useId();
  const valorId = useId();
  const descricaoId = useId();
  const [feedback, setFeedback] = useState<null | {
    kind: "success" | "error";
    message: string;
  }>(null);
  const { data } = useAccountOverviewQuery();
  const balance = data?.balance ?? 0;
  const transferMutation = useTransferMutation();

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

  const onSubmit = handleSubmit(async (values) => {
    setFeedback(null);

    try {
      const result = await transferMutation.mutateAsync(values);

      setFeedback({
        kind: "success",
        message: `Transferencia de ${formatCurrency(result.transaction.amount)} enviada para ${result.transaction.counterparty}.`,
      });
      reset();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Nao foi possivel concluir a transferencia.";
      setFeedback({ kind: "error", message });
    }
  });

  return (
    <SectionCard
      title="Nova transferencia"
      description="Validacao de formulario com React Hook Form + Zod e atualizacao do cache remoto."
    >
      <div className="mb-5 rounded-(--app-radius-card) border border-(--app-border-subtle) bg-(--app-surface-muted) p-4">
        <p className="text-xs uppercase tracking-[0.25em] text-(--app-text-label)">
          Limite operacional imediato
        </p>
        <p className="mt-2 text-2xl font-semibold text-(--app-text-primary)" aria-label="Resumo de saldo e sessao">
          {formatCurrency(balance)}
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <Field
          label="Destinatario"
          fieldId={destinatarioId}
          error={errors.to?.message}
          placeholder="Ex.: Marina Costa"
          autoComplete="name"
          {...register("to")}
        />

        <Field
          label="Valor"
          fieldId={valorId}
          error={errors.amount?.message}
          type="number"
          min={0}
          step="0.01"
          inputMode="decimal"
          placeholder="0,00"
          {...register("amount")}
        />

        <Field
          label="Descricao"
          fieldId={descricaoId}
          error={errors.description?.message}
          placeholder="Motivo da transferencia"
          autoComplete="off"
          {...register("description")}
        />

        {feedback ? (
          <FeedbackBanner kind={feedback.kind} message={feedback.message} />
        ) : null}

        <button
          type="submit"
          disabled={transferMutation.isPending}
          className="w-full rounded-(--app-radius-pill) bg-(--app-accent-orange-strong px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-(--app-accent-orange)] disabled:cursor-wait disabled:opacity-70"
        >
          {transferMutation.isPending ? "Processando..." : "Transferir agora"}
        </button>
      </form>
    </SectionCard>
  );
}

type FieldProps = {
  label: string;
  fieldId: string;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id">;

function Field({
  label,
  fieldId,
  error,
  className,
  ...inputProps
}: FieldProps) {
  const errorId = `${fieldId}-error`;

  return (
    <div className="block">
      <label
        htmlFor={fieldId}
        className="mb-2 block text-sm font-medium text-(--app-text-secondary)"
      >
        {label}
      </label>
      <input
        {...inputProps}
        id={fieldId}
        className={clsx(inputFocusClass, className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <span
          id={errorId}
          className="mt-2 block text-sm text-rose-200"
          role="alert"
        >
          {error}
        </span>
      ) : null}
    </div>
  );
}
