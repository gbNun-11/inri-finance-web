import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/axios'
import { loginSchema } from '@/schemas/loginSchema'

const LoginPage = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (!accessToken && !refreshToken) return
        const res = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        setUser(res.data)
      } catch (e) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        console.error(e)
      }
    }
    init()
  })
  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const res = await api.post('/auth/login', {
        email: variables.email,
        password: variables.password,
      })
      return res.data
    },
  })
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const handleSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loginUser) => {
        const accessToken = loginUser.tokens.accessToken
        const refreshToken = loginUser.tokens.refreshToken
        setUser(loginUser)
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        toast.success('Login efetuado com sucesso!')
      },
      onError: () => {
        toast.error(
          'Erro ao efetuar login. Por favor, tente novamente mais tarde!',
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
            <CardTitle>Entre na sua conta</CardTitle>
            <CardDescription>Insira os seus dados abaixo:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FieldGroup className="mx-auto w-full">
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
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Fazer login
            </Button>
          </CardFooter>
        </Card>
      </form>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Ainda não possui uma conta?</p>
        <Button
          variant="link"
          nativeButton={false}
          render={<Link to="/signup" />}
        >
          Criar conta
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
