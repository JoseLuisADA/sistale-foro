import { useState } from 'react';
import { useRouter } from 'next/navigation'

const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter()

  const changePassword = async (token, oldPassword, newPassword) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/account/member-actions/change-password', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al cambiar la contraseña');
      }
      router.push('/')
      alert('Contraseña cambiada correctamente');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading, error };
};

export default useChangePassword;
