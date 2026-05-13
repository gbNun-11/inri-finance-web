import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { forwardRef, useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'

const PasswordInput = forwardRef(
  ({ placeholder = 'Digite sua senha', ...props }, ref) => {
    const [passwordVisible, setPasswordVisible] = useState(false)

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={passwordVisible ? 'text' : 'password'}
          placeholder={placeholder}
          {...props}
        />

        <Button
          type="button"
          variant="ghost"
          className="text-muted-foreground absolute top-0 right-0 bottom-0 my-auto mr-1 h-8 w-8"
          onClick={() => setPasswordVisible((prev) => !prev)}
        >
          {passwordVisible ? <EyeIcon /> : <EyeOffIcon />}
        </Button>
      </div>
    )
  },
)

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
