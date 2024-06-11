'use client'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useArticulo from '../../../hooks/articulo/useArticulo'
import ComentariosList from '../../../components/ComentariosList'
import CreateComentarioForm from '../../../components/CreateComentarioForm'
import { useUserContext } from '../../../context/UserContext'
import MainLayout from '../../../components/layout/MainLayout'
import DeleteArticuloButton from '../../../components/DeleteArticuloButton'
import OpenEditArticuloModalButton from '../../../components/EditArticuloButton'
import EditArticuloModal from '../../../components/EditArticuloModal'
import { ArticuloProps } from '../../../types/articuloProps'
import { useRouter } from 'next/navigation'
import useComentarios from '../../../hooks/comentario/useComentarios'

const ArticuloPage = ({ params }) => {
  const { idArticulo } = params
  const { articulo, isLoading, error, fetchArticulo } = useArticulo(idArticulo)
  const { comentarios, isLoading: isLoadingComentarios, refetch } = useComentarios(idArticulo);
  const { user } = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedArticulo, setSelectedArticulo] = useState<ArticuloProps | null>(null)
  const router = useRouter()

  const handleArticuloDeletedOrUpdate = () => {
    closeModal()
    router.push('/')
  }

  const openModal = (articulo: ArticuloProps) => {
    setSelectedArticulo(articulo)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedArticulo(null)
    setIsModalOpen(false)
  }

  useEffect(() => {
    fetchArticulo()
  }, [fetchArticulo])

  return (
    <MainLayout>
      {isLoading && <p className="text-center mt-10">Cargando artículo...</p>}
      {error && <p className="text-red-500 text-center font-bold italic">{error}</p>}
      {!isLoading && !error && !articulo && <p className="text-center mt-10">Artículo no encontrado.</p>}
      {articulo && (
        <div className="p-4">
          {user.role === 'admin' && (
            <>
              <DeleteArticuloButton
                idArticulo={articulo._id}
                token={user.token}
                onArticuloDeleted={handleArticuloDeletedOrUpdate}
              />
              <OpenEditArticuloModalButton onClick={() => openModal(articulo)} />
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
          <h1 className="text-3xl font-bold">{articulo.titulo}</h1>
          <p className="text-gray-700 mt-4">{articulo.contenido}</p>
          <p className="text-sm text-gray-500 mt-2">Por: {articulo.username}</p>
          <p className="text-sm text-gray-500">Fecha: {new Date(articulo.fecha).toLocaleString()}</p>
          <h5 className="mt-5 text-xl font-semibold">Comentarios:</h5>
          <ComentariosList idArticulo={idArticulo} user={user} comentarios={comentarios} isLoading={isLoadingComentarios} refetch={refetch} />
          {user.role && (
                <CreateComentarioForm
                idArticulo={idArticulo}
                username={user.username}
                token={user.token}
                onCommentAdded={refetch}
                />
          )}
        </div>
      )}
    </MainLayout>
  )
}

ArticuloPage.propTypes = {
  params: PropTypes.object.isRequired
}

export default ArticuloPage
