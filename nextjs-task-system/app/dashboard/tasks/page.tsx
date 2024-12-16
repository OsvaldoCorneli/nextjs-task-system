// app/page.tsx
// URLs de tus APIs
const TASKS_API = 'http://localhost:3000/api/tasks';

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
    const [tasks] = await Promise.all([
      fetchData(TASKS_API),
    ]);
    
    return (
      <main>
        <h3>Tareas</h3>
        <section>
          
          <ul>
            {tasks.response.map((task: any) => (
              <li key={task.id}>
                {task.title} - {task.status}
              </li>
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
