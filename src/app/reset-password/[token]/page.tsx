// src/app/reset-password/[token]/page.tsx
'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import MainLayout from '../../../components/layout/MainLayout';
import useResetPassword from '../../../hooks/account/public-actions/useRecoverPassword';
import passwordSchema from '../../../lib/resetPasswordSchema';

// Validate the password input
const validatePassword = (password) => {
  try {
    passwordSchema.parse(password);
    return null;
  } catch (error) {
    return error.issues[0].message;
  }
};



const ResetPasswordPage = () => {
  const params = useParams();
  const token = params.token;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { resetPassword, isLoading, error, setError } = useResetPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("TOKEN EN RESET PASSWORD :")
    console.log(token)
    // Validate the password input
    const validationError = validatePassword(password);
    if (validationError) {
      // Set the error state and return early
      setError(validationError);
      return;
    }

    // Validate that the password and confirmPassword fields match
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError(null);

    // Call the resetPassword function
    await resetPassword(token, password);
  };

  return (
    <MainLayout>
      <div className="flex mt-32 justify-center">
        <form className="bg-white shadow-md w-[50rem] rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Nueva contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirmar contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Restablecer contraseña'}
            </button>
          </div>
          {error && <p className="text-red-500 text-center font-bold italic">{error}</p>}
        </form>
      </div>
    </MainLayout>
  );
};

export default ResetPasswordPage;
