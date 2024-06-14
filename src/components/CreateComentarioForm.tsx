'use client'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useCreateComentario from '../hooks/comentario/useCreateComentario'

const CreateComentarioForm = ({ idArticulo, token, onCommentAdded }) => {
  const [contenido, setContenido] = useState('')
  const { createComentario, isLoading, error } = useCreateComentario()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newComment = await createComentario(contenido, idArticulo, token)
    if (newComment) {
      onCommentAdded() // Llama a la función refetch para recargar los comentarios
      setContenido('')
    }
  }

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
  )
}

CreateComentarioForm.propTypes = {
  idArticulo: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  onCommentAdded: PropTypes.func.isRequired,
}

export default CreateComentarioForm
