import TeamCard from '../../../components/TeamCard'
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
    
    const [teams] = await Promise.all([
      fetchData(TEAMS_API),
    ]);
    return (
      <main>
          <h3>Equipos</h3>
        <section>
        
            {teams.response.map((team: any) => (
              <TeamCard
              team_id={team.team_id}
              name={team.name}
              users={team.users}
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
