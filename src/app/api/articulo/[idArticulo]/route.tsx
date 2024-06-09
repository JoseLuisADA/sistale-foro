// src/app/api/articulo/[id]/route.tsx
"use server"
import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '../../../../../axios';  // Asegúrate de que la ruta sea correcta

export async function DELETE(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const idArticulo = pathname.split('/').pop(); // Extrae el ID del artículo del URL

  try {
    const response = await axiosInstance.delete(`/articulo/${idArticulo}`, {
      headers: {
        'Authorization': req.headers.get('Authorization') || '',
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Importante para gestionar la sesión si es necesario
    });

    if (response.status !== 200) {
      throw new Error('No se pudo eliminar el artículo');
    }

    return NextResponse.json({ message: 'Artículo eliminado correctamente' }, { status: 200 });
  } catch (error) {
    console.error('Error al eliminar el artículo:', error);
    return NextResponse.json({ message: 'Error interno' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }) {
  const { idArticulo } = params;
  const body = await req.json();

  console.log("ARTICULO ROUTE PUT:")
  console.log("ID:")
  console.log(idArticulo)

  try {
    const { data } = await axiosInstance.patch(
      `/articulo/${idArticulo}`,
      {
        titulo: body.titulo,
        contenido: body.contenido,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': req.headers.get('Authorization')
        },
        withCredentials: true,
      }
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log("ERROR EN ARTICULO ROUTE PUT:")
    console.log(error)
    const message = error.response?.data.message || 'Error desconocido al actualizar el artículo';
    return NextResponse.json({ message }, { status: error.response?.status || 500 });
  }
}

