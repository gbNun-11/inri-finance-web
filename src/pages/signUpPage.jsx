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
import { Checkbox } from '@/components/ui/checkbox'
import { FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

const SignUp = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-125">
        <CardHeader className="text-center">
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>Insira os seus dados abaixo:</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Digite seu Nome" />
          <Input placeholder="Digite seu Sobrenome" />
          <Input placeholder="Digite seu E-mail" />
          <PasswordInput placeholder="Digite sua senha" />
          <PasswordInput placeholder="Digite sua senha novamente" />
          <FieldGroup className="mx-auto w-full">
            <div className="flex items-center gap-2">
              <Checkbox id="terms" name="terms-checkbox-desc" defaultChecked />

              <FieldLabel
                htmlFor="terms"
                className="text-muted-foreground text-xs opacity-75"
              >
                Ao clicar em "Criar conta", você aceita nosso termo de uso e
                política de privacidade
              </FieldLabel>
            </div>
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Criar conta</Button>
        </CardFooter>
      </Card>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/login">Faça login</Link>
        </Button>
      </div>
    </div>
  )
}

export default SignUp
;<></>
