// app/page.tsx
// URLs de tus APIs
const USERS_API = 'http://localhost:3000/api/users';
const TASKS_API = 'http://localhost:3000/api/tasks';
const TEAMS_API = 'http://localhost:3000/api/teams';

async function fetchData(url: string) {
  const res = await fetch(url, { cache: 'no-store' }); // Evita cache para obtener siempre datos frescos
  if (!res.ok) {
    throw new Error(`Error fetching ${url}: ${res.statusText}`);
  }
  return res.json();
}

export default async function HomePage() {
  try {
    // Realizamos las llamadas a las APIs de manera concurrente
    const [teams] = await Promise.all([
      fetchData(TEAMS_API),
    ]);
    
    return (
      <main>
          <h3>Equipos</h3>
        <section>
          <ul>
            {teams.response.map((team: any) => (
              <li key={team.id}>{team.name}</li>
            ))}
          </ul>
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
