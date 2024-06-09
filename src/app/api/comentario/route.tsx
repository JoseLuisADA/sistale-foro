// src/app/api/comentario/route.tsx
import axios from '../../../../axios';
import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
 
  try {
    console.log("ENTRANDO EN POST DE COMENTARIO ROUTE:")
    console.log("TOKEN")
    console.log(body.token)
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/comentario`,
      {
        contenido: body.contenido,
        idArticulo: body.idArticulo,
        username: body.username,
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
    console.error(error);
    if (isAxiosError(error)) {
      if (error.response) {
        const message = error.response.data.message || "Error desconocido al crear el comentario";
        return NextResponse.json({ message }, { status: error.response.status });
      }
    }
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}
