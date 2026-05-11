import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
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
          <div className="relative">
            <Input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Digite sua Senha"
            />
            <Button
              variant="ghost"
              className="text-muted-foreground absolute top-0 right-0 bottom-0 my-auto mr-1 h-8 w-8"
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          </div>
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
