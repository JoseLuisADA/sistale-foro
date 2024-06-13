// src/app/api/auth/recover-password/route.tsx
'use server';
import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '../../../../../../axios';
import { isAxiosError } from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();
    await axiosInstance.post('/recover-password', { username });

    return NextResponse.json({ message: 'Se ha enviado un correo electrónico para recuperar la contraseña' }, { status: 200 });
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
