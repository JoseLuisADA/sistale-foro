'use client';

import React, { useState } from 'react';
import useRegister from '../../hooks/account/public-actions/useRegister';
import registerSchema from '../../lib/registerSchema';
import MainLayout from '../../components/layout/MainLayout';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [zodErrors, setErrorsZod] = useState({ username: '', email: '', password: '', confirmPassword: '', general: '' });
  const { register, isLoading, setIsLoading, error } = useRegister();

  const handleSignUp = async (event: React.FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    setErrorsZod({ username: '', email: '', password: '', confirmPassword: '', general: '' });
    const result = registerSchema.safeParse({ username, email, password, confirmPassword });
    if (!result.success) {
      const newErrors = { username: '', email: '', password: '', confirmPassword: '', general: '' };
      result.error.issues.forEach(issue => {
        newErrors[issue.path[0]] = issue.message;
      });
      setTimeout(() => {
        setErrorsZod(newErrors);
        setIsLoading(false);
      }, 1000);
      return;
    }
    setErrorsZod({ username: '', email: '', password: '', confirmPassword: '', general: '' });
    try {
      setTimeout(() => {
      }, 1000);
      await register(username, password, email);
      setIsLoading(false);
    } catch (err) {
      console.error('Error al registrarse:', err);
      setErrorsZod({ ...zodErrors, general: 'Error al registrarse. Por favor, inténtelo de nuevo.' });
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className='flex justify-center'>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-[50rem] mt-14" onSubmit={handleSignUp}>
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
              onChange={(e) => setUsername(e.target.value)}
            />
            {zodErrors.username && <p className="text-red-500 text-xs italic">{zodErrors.username}</p>}
            <p className="text-gray-600 text-xs italic">Debe ser único y contener al menos 1 carácter.</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {zodErrors.email && <p className="text-red-500 text-xs italic">{zodErrors.email}</p>}
            <p className="text-gray-600 text-xs italic">Debe ser una dirección de correo electrónico válida.</p>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {zodErrors.password && <p className="text-red-500 text-xs italic">{zodErrors.password}</p>}
            <p className="text-gray-600 text-xs italic">Debe tener al menos 1 caracter.</p>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirmar Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="*******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {zodErrors.confirmPassword && <p className="text-red-500 text-xs italic">{zodErrors.confirmPassword}</p>}
            <p className="text-gray-600 text-xs italic">Debe coincidir con la contraseña.</p>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              {isLoading ? (
                <i className="bx bx-loader bx-spin bx-sm">Cargando...</i>
              ) : (
                'Registrarse'
              )}
            </button>
          </div>
          {error && <p className="text-red-500 text-center font-bold italic mt-3">{error}</p>}
        </form>
      </div>
    </MainLayout>
  );
};

export default SignUpPage;
