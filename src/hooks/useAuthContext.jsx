import { useContext } from 'react'

import { AuthContext } from '@/contexts/auth-context'

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuthContext deve ser usado dentro de AuthContextProvider',
    )
  }

  return context
}
