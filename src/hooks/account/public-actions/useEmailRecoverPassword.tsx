// src/hooks/account/useRecoverPassword.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation'

const useRecoverPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const recoverPassword = async (username) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/account/public-actions/email-recover-password', {
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
      router.push('/login');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { recoverPassword, isLoading, error };
};

export default useRecoverPassword;