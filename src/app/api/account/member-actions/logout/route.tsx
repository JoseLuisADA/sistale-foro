"use server";
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';

export async function POST() {
    console.log("ENTRANDO EN LOGOUT")
    cookies().delete("sistale")
    return NextResponse.json({ message: "Has cerrado la sesión" }, { status: 200 });
}
