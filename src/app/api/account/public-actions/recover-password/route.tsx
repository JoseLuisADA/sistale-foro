// src/app/api/auth/reset-password/route.tsx
'use server';
import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '../../../../../../axios';
import { jwtVerify } from 'jose'
import { isAxiosError } from 'axios';


export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();
    console.log('RECOVER PASSWORD ROUTE :')
    console.log('TOKEN')
    console.log(token)
    console.log('NEW PASSWORD')
    console.log(newPassword)

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || '')
    
    const { payload } = await jwtVerify(token, secret)
    
    const { username } = payload;

    await axiosInstance.put('/change-password-recovery', { username, newPassword },{
      headers: {
        'Authorization': req.headers.get('Authorization') || '',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    
    return NextResponse.json({ message: 'La contraseña se ha restablecido con éxito' }, { status: 200 });
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
