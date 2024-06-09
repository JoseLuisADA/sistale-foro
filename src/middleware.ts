import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(req: NextRequest) {
  console.log('\n -----------INICIANDO MIDDLEWARE----------------- \n')

  const response: NextResponse = NextResponse.next()
  const url = req.nextUrl
  const cookie = req.cookies.get('session') || null
  let role: string = ''
  let username: string = ''

  if (cookie) {
    console.log('COOKIE:')
    console.log(cookie)
    console.log('\n')

    const token = cookie?.value || ''

    console.log('COOKIE VALUE:')
    console.log(token)
    console.log('\n')

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || '')
      const { payload } = await jwtVerify(token, secret)
      console.log('COOKIE VALUE TOKEN DECODED:', payload)

      role = payload.role as string; // Update the role variable here
      username = payload.username as string;

      response.headers.set('x-username', username);
      response.headers.set('x-role', role);
      response.headers.set('x-token', token);

      console.log("\n RESPONSE WITH HEADERS: \n")
      console.log(response)
      console.log("\n-----------------------------------------------")

    } catch (error) {
      console.log('ERROR EN MIDDLEWARE:')
      if (error instanceof Object) {
        console.log('LLAVE DE TOKEN VACÍA O NO HAY TOKEN')
      }
    }
  }

  if (url.pathname.startsWith('/change-password') && !username) {
    return NextResponse.redirect(new URL('/', req.url))
  } else if(url.pathname.startsWith('/user-management') && role !== 'admin'){
    return NextResponse.redirect(new URL('/not-found', req.url))
  } else if(url.pathname.startsWith('/login') && username !== ''){
    return NextResponse.redirect(new URL('/', req.url))
  } else if(url.pathname.startsWith('/crear-articulo') && role !== 'admin'){
    return NextResponse.redirect(new URL('/login', req.url))
  } 

  return response
}

export const clear = {
  matcher: ['/']
}
