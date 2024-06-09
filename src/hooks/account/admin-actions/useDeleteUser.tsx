'use client'
import { useState } from 'react';

const useDeleteUser = () => {
  const [error, setError] = useState<string | null>(null);

  const deleteUser = async (username: string, token: string) => {
    setError(null);
    try {
      const response = await fetch(`/api/account/admin-actions`,{
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al eliminar el usuario');
      }

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  return { deleteUser, error };
};

export default useDeleteUser;
