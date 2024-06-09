'use client';
// src/components/CreateComentarioForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import useCreateComentario from '../hooks/comentario/useCreateComentario';

const CreateComentarioForm = ({ idArticulo, username, token, onCommentAdded }) => {
  const [contenido, setContenido] = useState('');
  const { createComentario, isLoading, error } = useCreateComentario();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("ENTRANDO EN HANDLE SUBMIT DE CREATE COMENTARIO FORM")
    console.log("ID ARTICULO:")
    console.log(idArticulo)
    const newComment = await createComentario(contenido, username, idArticulo, token);
    if (newComment) {
      onCommentAdded(newComment, idArticulo);
      setContenido(''); // Limpia el formulario después de enviar
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-4">
      <textarea
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        disabled={isLoading}
        placeholder="Escribe tu comentario..."
        className="resize-none p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
        rows={3}
      />
      <button 
        type="submit" 
        disabled={isLoading}
        className="bg-blue-500 w-40 py-1 px-1 text-sm hover:bg-blue-700 text-white font-bold rounded disabled:bg-gray-400"
      >
        {isLoading ? 'Enviando...' : 'Enviar Comentario'}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

// Define PropTypes para CreateComentarioForm
CreateComentarioForm.propTypes = {
  idArticulo: PropTypes.string.isRequired, // Asegúrate de que idArticulo sea requerido y sea de tipo string
  username: PropTypes.string.isRequired, // Asegúrate de que idArticulo sea requerido y sea de tipo string
  token: PropTypes.string.isRequired, // Asegúrate de que idArticulo sea requerido y sea de tipo string
  onCommentAdded: PropTypes.func.isRequired, // Asegúrate de que onCommentAdded sea requerido y sea de tipo función
};

export default CreateComentarioForm;
