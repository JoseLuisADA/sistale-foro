import { useState } from 'react';

const useDeleteArticulo = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteArticulo = async (idArticulo, token) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/articulo/${idArticulo}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('No se pudo eliminar el artículo');
      }
      return true; 
    } catch (error) {
      alert(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteArticulo, isLoading };
};

export default useDeleteArticulo;
