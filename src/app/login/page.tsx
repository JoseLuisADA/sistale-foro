'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import useLogin from '../../hooks/account/public-actions/useLogin'
import MainLayout from '../../components/layout/MainLayout'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useLogin()
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
      await login(username, password)
  }

  return (
    <MainLayout>
      <div className="flex mt-32 justify-center">
        <form className="bg-white shadow-md w-[50rem] rounded px-8 pt-6 pb-8" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="*********"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}>
              {isLoading ? 'Cargando...' : 'Entrar'}
            </button>
            <Link href="/recover-password" className="text-blue-500 hover:text-blue-700">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          {error && <p className="text-red-500 text-center font-bold italic">{error}</p>}
        </form>
        <div className='ml-3 mr-3'></div>
        <div className="p-4 text-center content-center bg-white shadow-md rounded">
          <h2 className="text-lg">¿Nuevo aquí?</h2>
          <p className="mb-6">Únete a nosotros hoy y explora más!</p>
          <Link href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Regístrate
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}

export default LoginPage
