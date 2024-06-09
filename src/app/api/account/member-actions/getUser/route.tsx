import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  console.log("entrando en GET /api/getUser");
  const headers = req.headers;
  const username = headers.get('x-username') || '';
  const role = headers.get('x-role') || '';
  const token = headers.get('x-token') || '';

  return NextResponse.json({ username, role, token });
}
