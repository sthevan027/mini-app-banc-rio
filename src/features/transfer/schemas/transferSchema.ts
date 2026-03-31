import { z } from "zod";

export const transferSchema = z.object({
  to: z
    .string()
    .trim()
    .min(3, "Informe um destinatario com pelo menos 3 caracteres."),
  amount: z.coerce
    .number()
    .positive("Digite um valor maior que zero.")
    .max(99999, "Use um valor de transferencia menor."),
  description: z
    .string()
    .trim()
    .min(3, "Adicione uma descricao curta para a transferencia.")
    .max(40, "A descricao pode ter ate 40 caracteres."),
});

export type TransferFormInput = z.input<typeof transferSchema>;
export type TransferFormValues = z.output<typeof transferSchema>;
