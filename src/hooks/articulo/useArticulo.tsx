"use client"
import { useState, useEffect, useCallback } from 'react';
import { ArticuloProps } from '../../types/articuloProps';

const useArticulo = (idArticulo: string) => {
  const [articulo, setArticulo] = useState<ArticuloProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticulo = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/articulo/${idArticulo}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener el artículo');
      }

      setArticulo(data);
    } catch (error) {
      console.log("Error en useArticulo:");
      console.log(error);
      setError('Artículo temporalmente no disponible');
    } finally {
      setIsLoading(false);
    }
  }, [idArticulo]);

  useEffect(() => {
    if (idArticulo) {
      fetchArticulo();
    }
  }, [fetchArticulo, idArticulo]);

  return { articulo, isLoading, error, fetchArticulo };
};

export default useArticulo;
