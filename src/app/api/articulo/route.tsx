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
