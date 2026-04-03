import { z } from 'zod'

export const loginSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Informe seu nome.'),
  email: z.email('Informe um email valido.'),
})

export type LoginFormInput = z.input<typeof loginSchema>
export type LoginFormValues = z.output<typeof loginSchema>
