// src/app/api/articulo/[id]/route.tsx
"use server"
import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '../../../../../axios';  // Asegúrate de que la ruta sea correcta
import { isAxiosError } from 'axios';

export async function GET(req: NextRequest, { params }) {
  const { idArticulo } = params;

  try {
    const { data } = await axiosInstance.get(`/articulo/${idArticulo}`);
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

