//sistaleforo-web-final/src/app/api/account/route.tsx
import axiosInstance from '../../../../../axios';
import { isAxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log("ENTRANDO EN ACCOUNT ROUTE.TSX FUNCTION GET :")
  try {
    const { data } = await axiosInstance.get('/users', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': req.headers.get('Authorization') || '',
      },
      withCredentials: true,
    });
    return NextResponse.json(data);
  } catch (error) {
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

export async function DELETE(req: NextRequest) {
  const { username } = await req.json();

  console.log('USER ROUTE DELETE:');
  console.log('USERNAME:');
  console.log(username);
  try {
    const response = await axiosInstance.delete(`/user/${username}`, {
      headers: {
        'Authorization': req.headers.get('Authorization') || '',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error('No se pudo eliminar el usuario');
    }

    return NextResponse.json({ message: 'Usuario eliminado correctamente' }, { status: 200 });
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

export async function PATCH(req: NextRequest) {
  const { newRole, username } = await req.json();
  try {
    const response = await axiosInstance.patch(
      `${username}/role`,
      { newRole },
      {
        headers: {
          Authorization: req.headers.get('Authorization') || '',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    if (response.status !== 200) {
      throw new Error('No se pudo cambiar el rol del usuario');
    }

    return NextResponse.json({ message: 'Rol de usuario cambiado correctamente' }, { status: 200 });
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