//sistaleforo-web-final/src/hooks/useLogin.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/account/public-actions/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data)
      }
      router.push('/')
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }

}

export default useLogin
