import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router'

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
import { Field, FieldError, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/schemas/loginSchema'

const LoginPage = () => {
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const handleSubmit = (data) => {
    console.log(data)
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
