// src/app/api/auth/recover-password/route.tsx
'use server';
import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '../../../../../../axios';

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();
    await axiosInstance.post('/recover-password', { username });

    return NextResponse.json({ message: 'Se ha enviado un correo electrónico para recuperar la contraseña' }, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ message: 'Error al recuperar la contraseña' }, { status: 500 });
  }
}
