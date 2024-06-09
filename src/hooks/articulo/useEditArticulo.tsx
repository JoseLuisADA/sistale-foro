// src/hooks/useEditArticulo.tsx
import { useState } from 'react';

const useEditArticulo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editArticulo = async (idArticulo: string, titulo: string, contenido: string, token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/articulo/${idArticulo}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ titulo, contenido })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar el artículo');
      }
      return data;
    } catch (error) {
      console.error('Error in useEditArticulo:', error);
      setError(error.message || 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  return { editArticulo, isLoading, error };
};

export default useEditArticulo;
