import { useState } from 'react';

const useCreateComentario = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createComentario = async (contenido: string, username: string, idArticulo: string, token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/comentario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Asegúrate de usar el esquema de autorización correcto
        },
        body: JSON.stringify({ contenido, username, idArticulo })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al crear el comentario');
      }
      return data;
    } catch (error) {
      console.error('Error in useCreateComentario:', error);
      setError(error.message || 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  return { createComentario, isLoading, error };
};

export default useCreateComentario;
