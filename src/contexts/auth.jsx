import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

import { AuthContext } from './auth-context'

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken)
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken)
}

const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'accessToken'
const LOCAL_STORAGE_REFRESH_TOKEN_KEY = 'refreshToken'

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true)
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY,
        )

        if (!accessToken && !refreshToken) return

        const res = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        setUser(res.data)
      } catch (e) {
        setUser(null)
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
        setUser(null)
        console.error(e)
      } finally {
        setIsInitializing(false)
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
        setUser(createdUser)
        setTokens(createdUser.tokens)
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
        setUser(loginUser)
        setTokens(loginUser.tokens)
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
    <AuthContext.Provider value={{ user, isInitializing, login, signup }}>
      {children}
    </AuthContext.Provider>
  )
}
