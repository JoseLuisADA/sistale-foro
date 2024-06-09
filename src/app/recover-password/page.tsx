// src/app/recover-password/page.tsx
'use client';
import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import useRecoverPassword from '../../hooks/account/public-actions/useEmailRecoverPassword';
import usernameSchema from '../../lib/recoverPasswordSchema';

// Validate the username input
const validateUsername = (username) => {
  try {
    usernameSchema.parse(username);
    return null;
  } catch (error) {
    return error.issues[0].message;
  }
};

const RecoverPasswordPage = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const { recoverPassword, isLoading } = useRecoverPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the username input
    const validationError = validateUsername(username);
    if (validationError) {
      // Set the error state and return early
      setError(validationError);
      return;
    }

    setError(null);
    console.log(username);

    // Call the recoverPassword function
    await recoverPassword(username);
  };

  return (
    <MainLayout>
      <div className="flex mt-32 justify-center">
        <form className="bg-white shadow-md w-[50rem] rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Nombre de usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Recuperar contraseña'}
            </button>
          </div>
          {error && <p className="text-red-500 text-center font-bold italic">{error}</p>}
        </form>
      </div>
    </MainLayout>
  );
};

export default RecoverPasswordPage;
