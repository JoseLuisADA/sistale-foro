'use client'
import { useState } from 'react'
import useLogin from './useLogin'

const useRegister = () => {
  const { login } = useLogin() // Utilizamos el hook useLogin
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const register = async (username: string, password: string, email: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/account/public-actions/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
        credentials: 'include' // Esto es importante para enviar cookies
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Error al registrarse')
      }
      await login(username, password)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { register, isLoading, error, setError, setIsLoading }
}

export default useRegister
