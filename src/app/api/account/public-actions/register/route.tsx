"use server"
import { NextRequest, NextResponse } from "next/server";
import axios from "../../../../../../axios";
import { isAxiosError } from 'axios';


export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
      await axios.post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/register`,
      {
        username: body.username,
        password: body.password,
        email: body.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Permitir el uso de cookies en la solicitud
      }
    );

    return NextResponse.json({ message: 'Cuenta creada' }, { status: 201 });
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 409) {
          return NextResponse.json({ message: "El usuario ya existe" }, { status: 409 });
        } else if (error.response.status === 400) {
          return NextResponse.json({ message: error.response.data.message || "Solicitud incorrecta" }, { status: 400 });
        }
      }
      return NextResponse.json({ message: "Error desconocido al intentar registrarse" }, { status: 500 });
    }
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}
