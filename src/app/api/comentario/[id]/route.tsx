// src/app/api/comentarios/[idArticulo]/route.tsx
import axiosInstance from '../../../../../axios';
import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const idComentario = pathname.split('/').pop(); // Extract the comment ID from the URL
  console.log("COMENTARIO ROUTE DELETE:")
  console.log("ID COMENTARIO:")
  console.log(idComentario)
  try {
    const response = await axiosInstance.delete(`/comentario/${idComentario}`, {
      headers: {
        'Authorization': req.headers.get('Authorization') || '',
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Important for session management if needed
    });

    if (response.status !== 200) {
      throw new Error('No se pudo eliminar el comentario');
    }

    return NextResponse.json({ message: 'Comentario eliminado correctamente' }, { status: 200 });
  } catch (error) {
    console.error('Error al eliminar el comentario:', error);
    return NextResponse.json({ message: 'Error interno' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const idArticulo = pathname.split('/').pop(); // Extrae el idArticulo del pathname

  if (!idArticulo) {
    return NextResponse.json({ message: "idArticulo es requerido" }, { status: 400 });
  }

  try {
    const { data } = await axiosInstance.get(`/comentarios/${idArticulo}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Permitir el uso de cookies en la solicitud
      }
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      if (error.response) {
        const message = error.response.data.message || "Error desconocido al obtener comentarios";
        return NextResponse.json({ message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}