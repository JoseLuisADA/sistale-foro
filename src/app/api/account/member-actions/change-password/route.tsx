"use server"
import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '../../../../../../axios';
import { isAxiosError } from 'axios';

export async function PUT(req: NextRequest) {
  try {
    const { oldPassword, newPassword } = await req.json();
    await axiosInstance.put('/change-password', { oldPassword, newPassword }, {
      headers: {
        'Authorization': req.headers.get('Authorization') || '',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return NextResponse.json({ message: 'Contraseña cambiada correctamente' }, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
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
