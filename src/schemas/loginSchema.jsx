import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .email({
      error: 'O e-mail é inválido',
    })
    .trim()
    .min(1, {
      error: 'O e-mail é obrigatório',
    }),
  password: z
    .string()
    .trim()
    .min(1, {
      error: 'A senha é obrigatória',
    })
    .min(6, {
      error: 'Senha inválida',
    }),
})
