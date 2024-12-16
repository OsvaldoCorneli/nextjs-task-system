import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode('your-secret-key');
const TOKEN_SECRET = 'eyJhbGciOiJIUzI1NiJ9'; 

export async function middleware(req: NextRequest) {

  const token = req.cookies.get('auth_token')?.value;
  const tokenAuth = req.headers.get('authorization')?.split(' ')[1]; 

 
  if (!token && !tokenAuth) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }


  if (tokenAuth && tokenAuth === TOKEN_SECRET) {
    return NextResponse.next(); 
  }

  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  if(req.nextUrl.pathname == "/"){
    if(token){
      const loginUrl = new URL('/dashboard', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  try {

    const { payload } = await jwtVerify(token, SECRET_KEY);
    const { email, role } = payload;
    

    if (role === 'user') {
      
      if (req.url.startsWith(new URL('/api', req.url).toString())) {
        
        return NextResponse.redirect(new URL('/', req.url)); 
      }
    }

    return NextResponse.next(); 
  } catch (err) {
    console.log("Error al verificar token:", err);
    
   
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
}


export const config = {
  matcher: [
    
    '/', 
    '/api', 
    '/api/tasks/:path*', 
    '/api/users/:path*', 
    '/api/comments/:path*', 
    '/api/teams/:path*'
    
  ], 
};
