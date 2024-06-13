// src/app/api/comentarios/[idArticulo]/route.tsx
import axiosInstance from '../../../../../axios';
import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from "next/server";

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
    if (isAxiosError(error)) {
      if(error.code === 'ECONNREFUSED') {
        return NextResponse.json("El foro de Sistale actualmente no está disponible", { status: 500 });
      }
      console.log(error)
      return NextResponse.json(error.response?.data.message, { status: error.response?.status || 500 });
    }
    return NextResponse.json({ message: "El foro de Sistale actualmente no está disponible" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const idComentario = pathname.split('/').pop();

  try {
    const response = await axiosInstance.delete(`/comentario/${idComentario}`, {
      headers: {
        'Authorization': req.headers.get('Authorization') || '',
        'Content-Type': 'application/json',
      },
      withCredentials: true, 
    });

    if (response.status !== 200) {
      throw new Error('No se pudo eliminar el comentario');
    }

    return NextResponse.json({ message: 'Comentario eliminado correctamente' }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      if(error.code === 'ECONNREFUSED') {
        return NextResponse.json("El foro de Sistale actualmente no está disponible", { status: 500 });
      }
      console.log(error)
      return NextResponse.json(error.response?.data.message, { status: error.response?.status || 500 });
    }
    return NextResponse.json({ message: "El foro de Sistale actualmente no está disponible" }, { status: 500 });
  }
}