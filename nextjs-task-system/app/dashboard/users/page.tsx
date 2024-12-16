
import UserCard from "@/components/UsersCard";

const USERS_API = 'http://localhost:3000/api/users';

async function fetchData(url: string) {
  const res = await fetch(url, { cache: 'no-store' }); 
  if (!res.ok) {
    throw new Error(`Error fetching ${url}: ${res.statusText}`);
  }
  return res.json();
}

export default async function HomePage() {
  try {
    const [users] = await Promise.all([
      fetchData(USERS_API),

    ]);
    
    return (
      <main className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 overflow-y-auto">Usuarios</h3>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.response.map((user: any) => (
            <UserCard
              key={user.user_id}
              user_id={user.user_id}
              name={user.name}
              email={user.email}
              password={user.password}
              role={user.role}
              team_id={user.team_id}
            />
          ))}
        </section>
      </main>
    );
    
  } catch (error) {
    console.error('Error rendering the dashboard:', error);

    return (
      <main>
        <h1>Error cargando el dashboard</h1>
        <p>Por favor, revisa los logs del servidor.</p>
      </main>
    );
  }
}
