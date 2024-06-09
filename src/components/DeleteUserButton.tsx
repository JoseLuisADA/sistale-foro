'use client';
import React from 'react';
import PropTypes from 'prop-types';
import useDeleteUser from '../hooks/account/admin-actions/useDeleteUser'

const DeleteUserButton = ({ username, token, onUserDeleted }) => {
  const { deleteUser } = useDeleteUser();

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de querer eliminar este usuario?')) {
      const deleted = await deleteUser(username, token);
      if (deleted) {
        onUserDeleted();
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 mb-8 bg-red-500 text-white font-bold rounded hover:bg-red-700"
    >
      Borrar usuario
    </button>
  );
};

DeleteUserButton.propTypes = {
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  onUserDeleted: PropTypes.func.isRequired,
};

export default DeleteUserButton;
