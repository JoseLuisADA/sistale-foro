// src/hooks/useComentarios.tsx
import { useState, useEffect } from 'react';
import axiosInstance from '../../../axios'; // Importa tu instancia configurada de axios
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
      const { data } = await axiosInstance.get(`/comentarios/${idArticulo}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setComentarios(data);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.message || 'Error al cargar los comentarios');
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
