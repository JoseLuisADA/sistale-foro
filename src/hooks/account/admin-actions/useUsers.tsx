//sistaleforo-web-final/src/hooks/account/useUsers.tsx
import { useState, useEffect } from 'react';
import { UserProps } from '../../../types/userProps';

const useUsers = (token: string) => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/account/admin-actions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al cargar los usuarios');
      }

      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchUsers();
  };

  return { users, isLoading, error, refetch };
};

export default useUsers;
