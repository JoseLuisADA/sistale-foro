'use client';
import React from 'react';
import PropTypes from 'prop-types';
import useDeleteArticulo from '../hooks/articulo/useDeleteArticulo';

const DeleteArticuloButton = ({ idArticulo, token, onArticuloDeleted }) => {
  const { deleteArticulo } = useDeleteArticulo();

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de querer eliminar este artículo?')) {
      const deleted = await deleteArticulo(idArticulo, token);
      if (deleted) {
        onArticuloDeleted();
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 mb-8 bg-red-500 text-white font-bold rounded hover:bg-red-700"
    >
      Borrar articulo
    </button>
  );
};

DeleteArticuloButton.propTypes = {
  idArticulo: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  onArticuloDeleted: PropTypes.func.isRequired,
};

export default DeleteArticuloButton;
