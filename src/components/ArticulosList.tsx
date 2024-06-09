//sistaleforo-web-final/src/components/ArticulosList.tsx
'use client'
import React, { useState, useEffect } from 'react'
import useArticulos from '../hooks/articulo/useArticulos'
import { ArticuloProps } from '../types/articuloProps'
import ComentariosList from './ComentariosList'
import CreateComentarioForm from './CreateComentarioForm'
import { useUserContext } from '../context/UserContext'
import DeleteArticuloButton from './DeleteArticuloButton'
import EditArticuloModal from './EditArticuloModal'
import OpenEditArticuloModalButton from './EditArticuloButton'

const ArticulosList = () => {
  const [page, setPage] = useState(1)
  const { articulos, isLoading, error, refetch } = useArticulos(page)
  const { user } = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedArticulo, setSelectedArticulo] = useState<ArticuloProps | null>(null)

  useEffect(() => {
    refetch();
  }, []);

  const handleNextPage = () => {
    if (!isLoading && articulos.length !== 0) {
      setPage(prevPage => prevPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1)
    }
  }

  const handleArticuloDeletedOrUpdate = () => {
    refetch();
    closeModal()
  };

  const openModal = articulo => {
    setSelectedArticulo(articulo)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedArticulo(null)
    setIsModalOpen(false)
  }

  return (
    <div>
      {isLoading && <p className="text-center">Cargando artículos...</p>}
      {error && <p className="text-red-500 text-center font-bold italic">{error}</p>}
      {!isLoading && !error && articulos.length > 0 && (
        <>
          <ul>
            {articulos.map((articulo: ArticuloProps) => (
              <li key={articulo._id} className="p-4 border rounded shadow-sm">
                {user.role === 'admin' && (
                  <>
                    <DeleteArticuloButton 
                      idArticulo={articulo._id} 
                      token={user.token}
                      onArticuloDeleted={handleArticuloDeletedOrUpdate} 
                    />
                    <OpenEditArticuloModalButton 
                      onClick={() => openModal(articulo)}
                    />
                    {selectedArticulo && selectedArticulo._id === articulo._id && (
                      <EditArticuloModal
                        isOpen={isModalOpen}
                        articulo={selectedArticulo}
                        onClose={closeModal}
                        onArticuloUpdated={handleArticuloDeletedOrUpdate}
                        token={user.token}
                      />
                    )}
                  </>
                )}

                <h2 className="text-xl font-bold">{articulo.titulo}</h2>
                <p className="text-gray-700">{articulo.contenido}</p>
                <p className="text-sm text-gray-500">Por: {articulo.username}</p>
                <p className="text-sm text-gray-500">Fecha: {new Date(articulo.fecha).toLocaleString()}</p>
                <h5 className='mt-5'>Comentarios:</h5>
                <ComentariosList idArticulo={articulo._id} user={user} />
                {user.role !== '' && (
                  <CreateComentarioForm
                    idArticulo={articulo._id}
                    username={user.username}
                    token={user.token}
                    onCommentAdded={refetch}
                  />
                )}
              </li>
            ))}
          </ul>
          <div className="pagination flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1 || isLoading}
              className="px-4 py-2 bg-blue-800 text-white rounded">
              Anterior
            </button>
            <span className="px-4 py-2">Página {page}</span>
            <button
              onClick={handleNextPage}
              disabled={articulos.length === 0 || isLoading}
              className="px-4 py-2 bg-blue-800 text-white rounded">
              Siguiente
            </button>
          </div>
        </>
      )}
      {!isLoading && !error && articulos.length === 0 && <p className="text-center">No hay artículos para mostrar.</p>}
    </div>
  )
}

export default ArticulosList
