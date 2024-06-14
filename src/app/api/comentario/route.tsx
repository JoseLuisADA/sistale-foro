// src/app/api/comentario/route.tsx
import axios from '../../../../axios';
import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
 
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/comentario`,
      {
        contenido: body.contenido,
        idArticulo: body.idArticulo,
      },
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${req.headers.get('Authorization')}`
        },
        withCredentials: true, // Permitir el uso de cookies en la solicitud
      }
    );

    return NextResponse.json(data, { status: 201 });
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
