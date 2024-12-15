import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { openDB } from '@/utils/db';

const SECRET_KEY = new TextEncoder().encode('your-secret-key'); // Asegúrate de que esta clave esté bien configurada

export async function POST(req: Request) {
  const { email, password } = await req.json(); // Obtener el email y la contraseña del cuerpo de la solicitud

  const db = await openDB()

  // Buscar al usuario con el email proporcionado
  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Verificar que la contraseña coincida (esto deberías hacerlo de manera más segura, como con hashing de contraseñas)
  if (password !== user.password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
    const { role} = user
  // Crear el token JWT usando 'jose'
  const token = await new SignJWT( {email, role} )
    .setProtectedHeader({ alg: 'HS256' }) // Establecemos el algoritmo de firma
    .setIssuedAt() // Fecha de emisión
    .setExpirationTime('1h') // Expira en 1 hora
    .sign(SECRET_KEY); // Firmamos el token con la clave secreta

  // Configurar la cookie con el token JWT
  const response = NextResponse.json({ message: 'Login successful' });

  response.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Asegúrate de que se utilice HTTPS en producción
    path: '/',
    maxAge: 3600, // 1 hora
  });

  return response;
}