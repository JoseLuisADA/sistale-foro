'use client';
import React from 'react';
import PropTypes from 'prop-types';
import { ComentarioProps } from '../types/comentarioProps';
import DeleteComentarioButton from './DeleteComentarioButton';

const ComentariosList = ({ user, comentarios, isLoading, refetch }) => {

  const handleCommentDeleted = () => {
    refetch();
  };

  return (
    <div>
      {isLoading && <p className='text-center'>Cargando comentarios...</p>}
      {!isLoading && (
        <ul>
          {comentarios.map((comentario: ComentarioProps) => (
            <li key={comentario._id} className="mb-4 p-4 border rounded shadow-sm">
              {user.role === 'admin' && (
                <DeleteComentarioButton
                  idComentario={comentario._id}
                  token={user.token}
                  onCommentDeleted={handleCommentDeleted}
                />
              )}
              <p className="text-gray-700">{comentario.contenido}</p>
              <p className="text-sm text-gray-500">Por: {comentario.username}</p>
              <p className="text-sm text-gray-500">Fecha: {new Date(comentario.fecha).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ComentariosList.propTypes = {
  idArticulo: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  comentarios: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default ComentariosList;
