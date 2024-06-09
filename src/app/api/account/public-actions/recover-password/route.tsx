// src/app/api/auth/reset-password/route.tsx
'use server';
import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '../../../../../../axios';
import { jwtVerify } from 'jose'


export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || '')
    const { payload } = await jwtVerify(token, secret)
    const { username } = payload;

    // Update the user's password in the database
    await axiosInstance.put('/change-password', { username, newPassword },{
      headers: {
        'Authorization': req.headers.get('Authorization') || '',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    
    return NextResponse.json({ message: 'La contraseña se ha restablecido con éxito' }, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ message: 'Error al restablecer la contraseña' }, { status: 500 });
  }
}
