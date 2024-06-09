// src/hooks/account/useResetPassword.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const useResetPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetPassword = async (token, newPassword) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/account/public-actions/reset-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al restablecer la contraseña');
      }

      alert('La contraseña se ha restablecido con éxito');
      router.push('/login');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { resetPassword, isLoading, error, setError };
};

export default useResetPassword;
