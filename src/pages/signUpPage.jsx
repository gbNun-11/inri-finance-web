import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router'
import { toast } from 'sonner'

import PasswordInput from '@/components/passwordInput'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { signUpSchema } from '@/schemas/signUpSchema'

const SignUp = () => {
  const [user, setUser] = useState(null)
  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const res = await api.post('/users/', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      })
      return res.data
    },
  })

  const methods = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      terms: false,
    },
  })
  const handleSubmit = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        const accessToken = createdUser.tokens.accessToken
        const refreshToken = createdUser.tokens.refreshToken
        setUser(createdUser)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        toast.success('Conta criada com sucesso!')
      },
      onError: () => {
        toast.error(
          'Erro ao criar conta. Por favor, tente novamente mais tarde!',
        )
      },
    })
  }
  if (user) {
    return <Navigate to="/" replace />
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Card className="w-125">
          <CardHeader className="text-center">
            <CardTitle>Crie sua conta</CardTitle>
            <CardDescription>Insira os seus dados abaixo:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldGroup className="mx-auto w-full">
              <Controller
                name="firstName"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Digite seu nome"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="lastName"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Sobrenome</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Digite seu sobrenome"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Digite seu E-mail"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Senha</FieldLabel>
                    <PasswordInput
                      {...field}
                      id={field.name}
                      placeholder="Digite sua senha"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="passwordConfirm"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirmar Senha
                    </FieldLabel>
                    <PasswordInput
                      {...field}
                      id={field.name}
                      placeholder="Digite sua senha novamente"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="terms"
                control={methods.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={field.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-invalid={fieldState.invalid}
                      />
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-muted-foreground text-xs opacity-75"
                      >
                        Ao clicar em "Criar conta", você aceita nosso termo de
                        uso e política de privacidade
                      </FieldLabel>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Criar conta
            </Button>
          </CardFooter>
        </Card>
      </form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta?</p>
        <Button
          variant="link"
          nativeButton={false}
          render={<Link to="/login" />}
        >
          Faça login
        </Button>
      </div>
    </div>
  )
}

export default SignUp
