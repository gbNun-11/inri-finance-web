import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'

const PasswordInput = ({ placeholder = 'Digite sua senha' }) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <div className="relative">
      <Input
        type={passwordVisible ? 'text' : 'password'}
        placeholder={placeholder}
      />
      <Button
        variant="ghost"
        className="text-muted-foreground absolute top-0 right-0 bottom-0 my-auto mr-1 h-8 w-8"
        onClick={() => setPasswordVisible((prev) => !prev)}
      >
        {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
      </Button>
    </div>
  )
}

export default PasswordInput
