// sistaleforo-web-final/src/app/api/articulo/route.tsx
"use server"
import axiosInstance from '../../../../axios';  // Importa la instancia de Axios configurada
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1';
  const size = searchParams.get('size') || '10';

  try {
    const { data } = await axiosInstance.get(`/articulos`, {
      params: { page, size }
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al obtener los artículos:', error);
    const status = error.response?.status || 500;
    const message = error.response?.data.message || 'Error interno del servidor';
    return new Response(message, { status });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { data } = await axiosInstance.post(`/articulo`, {
      titulo: body.titulo,
      contenido: body.contenido,
      username: body.username,
    }, {
      headers: {
        'Authorization': `${req.headers.get('Authorization')}`
      }
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error al crear el artículo:', error);
    const status = error.response?.status || 500;
    const message = error.response?.data.message || 'Error desconocido al crear el artículo';
    return new Response(message, { status });
  }
}


