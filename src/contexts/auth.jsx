import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

import { AuthContext } from './auth-context'

export const AuthContextProvider = ({ children }) => {
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
        setUser(null)
        console.error(e)
      }
    }

    init()
  }, [])

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
  const signup = (data) => {
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
  const login = (data) => {
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
  return (
    <AuthContext.Provider value={{ user, login, signup }}>
      {children}
    </AuthContext.Provider>
  )
}
