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
      if (error.response && error.response.status === 401) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
      } else if (error.response && error.response.status === 400) {
        return NextResponse.json({ message: 'Contraseña actual incorrecta' }, { status: 400 });
      } else if (error.response && error.response.status === 404) {
        return NextResponse.json({ message: 'No encontrado' }, { status: 404 });
      } else if (error.response && error.response.status === 500) {
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
      }
    }
    return NextResponse.json({ message: 'Error desconocido' }, { status: 500 });
  }
}
