"use client"
import { useState, useEffect, useCallback } from 'react';
import { ArticuloProps } from '../../types/articuloProps';

const useArticulos = (page: number = 1, categoria: string, size: number = 10) => {
  const [articulos, setArticulos] = useState<ArticuloProps[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArticulos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/articulo?categoria=${categoria}&page=${page}&size=${size}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener los artículos');
      }

      setArticulos(data.articulos);
      setTotal(data.total);
    } catch (error) {
      console.log("Error en useArticulos:");
      console.log(error);
      setError('Artículos temporalmente no disponibles');
    } finally {
      setIsLoading(false);
    }
  }, [page, size, categoria]);

  useEffect(() => {
    fetchArticulos();
  }, [fetchArticulos]);

  return { articulos, total, isLoading, error, refetch: fetchArticulos };
};

export default useArticulos;
