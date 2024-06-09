'use client';
import React from 'react';
import PropTypes from 'prop-types';
import useDeleteComentario from '../hooks/comentario/useDeleteComentario';

const DeleteComentarioButton = ({ idComentario, token, onCommentDeleted }) => {
  const { deleteComentario } = useDeleteComentario();

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de querer eliminar este comentario?')) {
      const deleted = await deleteComentario(idComentario, token);
      if (deleted) {
        onCommentDeleted();
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 mb-3 text-xs bg-red-500 text-white font-bold rounded hover:bg-red-700"
    >
      Borrar comentario
    </button>
  );
};

DeleteComentarioButton.propTypes = {
  idComentario: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  onCommentDeleted: PropTypes.func.isRequired,
};

export default DeleteComentarioButton;
