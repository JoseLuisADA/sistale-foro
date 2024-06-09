// sistaleforo-web-final/src/hooks/account/useChangeUserRole.tsx
import { useState } from 'react';

const useChangeUserRole = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeUserRole = async (username : string, token: string, newRole: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/account/admin-actions`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, newRole }),
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al cambiar el rol del usuario');
      }

      setIsLoading(false);
      return true;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      return false;
    }
  };

  return { changeUserRole, isLoading, error };
};

export default useChangeUserRole;