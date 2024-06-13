"use server"
import axiosInstance from '../../../../axios';  // Importa la instancia de Axios configurada
import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1';
  const size = searchParams.get('size') || '10';
  const categoria = searchParams.get('categoria');

  try {
    const { data } = await axiosInstance.get(`/articulos`, {
      params: { page, size, categoria }
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al obtener los artículos:');
    if (isAxiosError(error)) {
      console.error('Error de Axios:', error.response?.data);
      const status = error.response?.status || 500;
      const message = error.response?.data.message || 'Error interno del servidor';
      return new Response(message, { status });
    }
    console.error('Error desconocido:', error);
    return new Response('Error interno del servidor', { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { data } = await axiosInstance.post(`/articulo`, {
      titulo: body.titulo,
      contenido: body.contenido,
      username: body.username,
      categoria: body.categoria,
    }, {
      headers: {
        'Authorization': `${req.headers.get('Authorization')}`
      }
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error al crear el artículo:');
    if (isAxiosError(error)) {
      if(error.code === 'ECONNREFUSED') {
        return NextResponse.json("El foro de Sistale actualmente no está disponible", { status: 500 });
      }
      console.log(error)
      return NextResponse.json({ message: error.response?.data.message || "El foro de Sistale actualmente no está disponible" }, { status: error.response?.status || 500 });
    }
    return NextResponse.json({ message: "El foro de Sistale actualmente no está disponible" }, { status: 500 });
  }
}
