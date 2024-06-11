'use client'
import React, { useEffect } from 'react'
import useArticulos from '../hooks/articulo/useArticulos'
import { ArticuloProps } from '../types/articuloProps'
import { useRouter } from 'next/navigation'

interface ArticulosListProps {
  categoria: string
}

const ArticulosList = ({ categoria }: ArticulosListProps) => {
  {
    /* PAGINACIÓN (EN PENSAMIENTO DE COMO IMPLEMENTARLA EL CAMBIO DE LAS CATEGORIAS)
  const [page, setPage] = useState(1);
  */
  }
  const { articulos, isLoading, error, refetch } = useArticulos(1, categoria) //El 1 simboliza la pagina pero está hardcodeado para su funcionamiento ya que está pendiente la implementación del paginado
  const router = useRouter()

  useEffect(() => {
    refetch()
  }, [refetch])

  {
    /* PAGINACIÓN (EN PENSAMIENTO DE COMO IMPLEMENTARLA EL CAMBIO DE LAS CATEGORIAS)
  const handleNextPage = () => {
    if (!isLoading && articulos.length !== 0) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };
  */
  }

  return (
    <div>
      {isLoading && (
        <p className="text-center mt-10">Cargando artículos... , si tarda no te preocupes, solo es la primera vez.</p>
      )}
      {error && <p className="text-red-500 text-center font-bold italic">{error}</p>}
      {!isLoading && !error && articulos.length > 0 && (
        <>
          <ul>
            {articulos.map((articulo: ArticuloProps) => (
              <li key={articulo._id} className="p-4 border rounded shadow-sm bg-white">
                <div className="flex justify-between items-center">
                  <h2
                    className="text-lg cursor-pointer hover:underline"
                    onClick={() => router.push(`/articulo/${articulo._id}`)}>
                    {articulo.titulo}
                  </h2>
                  <div className="text-right">
                    <p className="text-sm font-medium">Creado por: {articulo.username}</p>
                    <p className="text-sm text-gray-500">{new Date(articulo.fecha).toLocaleString()}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* PAGINACIÓN (EN PENSAMIENTO DE COMO IMPLEMENTARLA EL CAMBIO DE LAS CATEGORIAS)

          <div className="pagination flex justify-between mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={page <= 0 || isLoading}
              className="px-4 py-2 ml-3 bg-blue-800 text-white rounded">
              Anterior
            </button>
            <span className="px-4 py-2">Página {page}</span>
            <button
              onClick={handleNextPage}
              disabled={articulos.length <= 10 || isLoading}
              className="px-4 py-2 mr-3 disabled:bg-blue-200 bg-blue-800 text-white rounded">
              Siguiente
            </button>
          </div>
          */}
        </>
      )}
      {!isLoading && !error && articulos.length === 0 && <p className="text-center">No hay artículos para mostrar.</p>}
    </div>
  )
}

export default ArticulosList
