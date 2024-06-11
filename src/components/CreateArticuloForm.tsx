'use client';
// src/components/CreateArticuloForm.tsx
import React, { useState } from 'react';
import useCreateArticulo from '../hooks/articulo/useCreateArticulo';
import PropTypes from 'prop-types';

interface CreateArticuloFormProps {
  username: string;
  token: string;
}

const CreateArticuloForm = ({ username, token }: CreateArticuloFormProps) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [categoria, setCategoria] = useState('noticias'); // Por defecto, categoría "noticias"
  const { createArticulo, isLoading, error } = useCreateArticulo();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("ENTRANDO EN COMPONENTE CREATE ARTICULO FORM:");
    console.log("USERNAME:");
    console.log(username);
    console.log("TOKEN:");
    console.log(token);
    await createArticulo(titulo, contenido, categoria, token, username);
  };

  return (
    <div className='flex justify-center mt-10'>
      <form onSubmit={handleSubmit} className="w-1/2 flex flex-col space-y-4 p-5 bg-white shadow-md rounded-lg">
        <div className='flex w-full'>
          <h2 className='mr-5 whitespace-nowrap'>Sección :</h2>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            disabled={isLoading}
            className="p-2 border w-full border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="noticias">Noticias y Actualizaciones</option>
            <option value="comunidad">Comunidad</option>
          </select>
        </div>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título del artículo"
          disabled={isLoading}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
        />
        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Contenido del artículo"
          disabled={isLoading}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
          rows={15}
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="px-4 py-2 mt-28 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded disabled:bg-gray-400"
        >
          Crear Artículo
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

CreateArticuloForm.propTypes = {
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default CreateArticuloForm;
