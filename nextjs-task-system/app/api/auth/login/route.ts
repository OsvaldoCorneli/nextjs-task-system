import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { openDB } from '@/utils/db';

const SECRET_KEY = new TextEncoder().encode('your-secret-key');

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const db = await openDB()


  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }


  if (password !== user.password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const { role } = user

  const token = await new SignJWT({ email, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(SECRET_KEY);


  const response = NextResponse.json({ message: 'Login successful' });

  response.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 3600,
  });

  return response;
}