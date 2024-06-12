import React from 'react'
import ArticulosList from './ArticulosList'
import Link from 'next/link'

const Sections = () => {
  return (
    <div className="container mx-auto mt-10 bg-white p-5 rounded shadow">
      <h1 className="text-4xl font-bold mb-8 text-center">Foro de Sistale</h1>
      <div className="p-5 hover:bg-yellow-100 rounded shadow-md">
        <div className="flex">
          <Link href="/sections/notices-and-updates">
            <img className="object-contain absolute" src="https://i.ibb.co/YWDBc74/1218.png"></img>
            <h2 className="text-2xl font-bold mb-4 ml-12">Noticias y Actualizaciones</h2>
          </Link>
        </div>
        <ArticulosList categoria="noticias" limit={3} />
      </div>
      <div className="p-5 bg-white rounded shadow-md mt-6 hover:bg-blue-100">
        <div className="flex">
          <Link href="/sections/community">
            <img className="object-contain rounded-full absolute" src="https://nosapki.com/images/icons/5010.png"></img>
            <h2 className="text-2xl font-bold mb-4 ml-12">Comunidad</h2>
          </Link>
        </div>
        <ArticulosList categoria="comunidad" limit={3} />
      </div>
    </div>
  )
}

export default Sections
