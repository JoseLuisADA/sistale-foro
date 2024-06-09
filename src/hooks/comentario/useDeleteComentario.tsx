// src/hooks/useDeleteComentario.js
import { useState } from 'react';

const useDeleteComentario = () => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteComentario = async (idComentario, token) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/comentario/${idComentario}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('No se pudo eliminar el comentario');
      }
      return true; // Return true if the comment is deleted successfully
    } catch (error) {
      alert(error.message);
      return false; // Return false if there is an error
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteComentario, isLoading };
};

export default useDeleteComentario;
