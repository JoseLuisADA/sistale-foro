"use server"
import { NextRequest, NextResponse } from "next/server";
import axios from "../../../../../../axios";
import { isAxiosError } from 'axios';


export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
      const response = await axios.post(
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

    return NextResponse.json(response.data);
  } catch (error: unknown) {
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
