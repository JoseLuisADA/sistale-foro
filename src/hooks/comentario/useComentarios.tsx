// src/hooks/useComentarios.tsx
import { useState, useEffect } from 'react';
import { isAxiosError } from 'axios';
import { ComentarioProps } from '../../types/comentarioProps';

const useComentarios = (idArticulo: string) => {
  const [comentarios, setComentarios] = useState<ComentarioProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComentarios = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/comentario/${idArticulo}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Comentarios temporalmente no disponibles');
      }
      setComentarios(data);
    } catch (error) {
      if (isAxiosError(error)) {
        setError('Comentarios temporalmente no disponibles');
      } else {
        setError('Error desconocido');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComentarios();
  }, [idArticulo]);

  const refetch = () => {
    fetchComentarios();
  };

  return { comentarios, isLoading, error, refetch };
};

export default useComentarios;
