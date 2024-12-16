'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (response.ok) {
      router.push('/login'); // Redirigir a la página de login tras cerrar sesión
    } else {
      console.error('Error al cerrar sesión');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Bienvenido a tu Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}



