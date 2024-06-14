// src/hooks/useCreateArticulo.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const useCreateArticulo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const createArticulo = async (titulo: string, contenido: string, categoria: string, token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/articulo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Assuming bearer token is used
        },
        body: JSON.stringify({ titulo, contenido, categoria}),
        credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data);
      }
      setIsLoading(false);
      router.push('/');
      return data;
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { createArticulo, isLoading, error };
};

export default useCreateArticulo;
