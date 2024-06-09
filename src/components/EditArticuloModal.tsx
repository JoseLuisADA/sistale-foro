'use client';
// src/components/EditArticuloModal.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useEditArticulo from '../hooks/articulo/useEditArticulo';

const EditArticuloModal = ({ isOpen, articulo, onClose, onArticuloUpdated, token }) => {
  const [titulo, setTitulo] = useState(articulo.titulo);
  const [contenido, setContenido] = useState(articulo.contenido);
  const { editArticulo, isLoading, error } = useEditArticulo();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await editArticulo(articulo._id, titulo, contenido, token);
    onArticuloUpdated(); 
  };

  if (!isOpen) return null;

  return (
    <div className="flex justify-center items-center">
      <div className="shadow-lg w-96">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título del artículo"
            disabled={isLoading}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Contenido del artículo"
            disabled={isLoading}
            className="resize-none p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            rows={5}
          />
          <div className="flex justify-end space-x-4">
            <button 
              type="button" 
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:bg-gray-400"
            >
              {isLoading ? 'Actualizando...' : 'Actualizar Artículo'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

EditArticuloModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  articulo: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onArticuloUpdated: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  
};

export default EditArticuloModal;
