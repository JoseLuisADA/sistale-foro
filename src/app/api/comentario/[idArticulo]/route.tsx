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
