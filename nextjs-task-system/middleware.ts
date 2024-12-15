import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode('your-secret-key'); // Usa una clave secreta segura
const TOKEN_SECRET = 'eyJhbGciOiJIUzI1NiJ9'; // Asegúrate de que esta clave coincida con la que se usa para firmar el token

export async function middleware(req: NextRequest) {
  // Obtener el token de la cookie 'auth_token' o del encabezado 'Authorization'
  const token = req.cookies.get('auth_token')?.value;
  const tokenAuth = req.headers.get('authorization')?.split(' ')[1]; // Obtener el token del header 'Authorization'
  
  // Si no hay token en cookies ni en los encabezados, redirigir al login
  if (!token && !tokenAuth) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Verificar el token desde el encabezado 'Authorization' (si es válido)
  if (tokenAuth && tokenAuth === TOKEN_SECRET) {
    return NextResponse.next(); // Si el token es válido, permite continuar
  }

  if (!token) {
    // Si no existe el token, redirigir al login
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verificar el token usando 'jose' y el SECRET_KEY
    const { payload } = await jwtVerify(token, SECRET_KEY);
    const { email, role } = payload;
    
    // Comprobamos el rol del usuario
    if (role === 'user') {
      // Si el rol es 'user', se puede acceder a la ruta principal '/'
      if (req.url.startsWith(new URL('/api', req.url).toString())) {
        // Si intenta acceder a una ruta de la API, redirigir a la página principal
        return NextResponse.redirect(new URL('/', req.url)); // Redirige si intenta acceder a la API
      }
    }

    return NextResponse.next(); // Deja pasar la solicitud si todo es válido
  } catch (err) {
    console.log("Error al verificar token:", err);
    
    // Si el token es inválido o ha expirado, redirigir al login
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
}

// Configuración del middleware para rutas protegidas
export const config = {
  matcher: [
    '/', 
    '/api', 
    '/api/tasks/:path*', 
    '/api/users/:path*', 
    '/api/comments/:path*', 
    '/api/teams/:path*'
  ], // Define las rutas que quieres proteger
};
