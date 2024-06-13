//sistaleforo-web-final/src/app/api/auth/login/route.tsx
"use server"
import { NextRequest, NextResponse } from "next/server";
import axios from '../../../../../../axios';
import { isAxiosError } from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/login`,
      {
        username: body.username,
        password: body.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Permitir el uso de cookies en la solicitud
      }
    );

    const res = NextResponse.json(response.data);

    const cookies = response.headers['set-cookie'];
    if (cookies) {
      cookies.forEach((cookie) => {
        const [name, value] = cookie.split(';')[0].split('=');
        res.cookies.set(name, value, {
          maxAge: 3600,
          path: '/',
          sameSite: 'lax',
        });
      });
    }

    return res;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error)
      return NextResponse.json({ message: error.response?.data.message || "El foro de Sistale actualmente no está disponible" }, { status: error.response?.status || 500 });
    }
    return NextResponse.json({ message: "El foro de Sistale actualmente no está disponible" }, { status: 500 });
  }
}
