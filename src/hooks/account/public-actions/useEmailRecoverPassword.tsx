// src/hooks/account/useRecoverPassword.tsx
import { useState } from 'react';

const useRecoverPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const recoverPassword = async (username) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/account/public-actions/recover-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al recuperar la contraseña');
      }

      alert('Se ha enviado un correo electrónico para recuperar la contraseña');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { recoverPassword, isLoading, error };
};

export default useRecoverPassword;