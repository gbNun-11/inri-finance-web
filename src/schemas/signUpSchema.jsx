import { z } from 'zod'

export const signUpSchema = z
  .object({
    firstName: z.string().trim().min(1, {
      error: 'O nome é obrigatório',
    }),
    lastName: z.string().trim().min(1, {
      error: 'O sobrenome é obrigatório',
    }),
    email: z
      .email({
        error: 'O e-mail é inválido',
      })
      .trim()
      .min(1, {
        error: 'O e-mail é obrigatório',
      }),
    password: z.string().trim().min(6, {
      error: 'A senha deve conter no mínimo 6 caracteres',
    }),
    passwordConfirm: z
      .string()
      .trim()
      .min(1, {
        error: 'A confirmação de senha é obrigatória',
      })
      .min(6, {
        error: 'A confirmação de senha deve conter no mínimo 6 caracteres',
      }),
    terms: z.literal(true, {
      error: 'Você deve aceitar os termos e condições',
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: 'As senhas não coincidem',
    path: ['passwordConfirm'],
  })
