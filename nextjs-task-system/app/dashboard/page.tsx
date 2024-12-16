import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode('your-secret-key'); 
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

export default async function Dashboard() {

  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;
  const users = (await fetchData(USERS_API))
  const tasks = await fetchData(TASKS_API)
  const teams = await fetchData(TEAMS_API)

 
  if (!token) {
    return <h1>No estás autenticado. Por favor, inicia sesión.</h1>;
  }

 

  try {

    const { payload } = await jwtVerify(token, SECRET_KEY);
    

    const { email, role } = payload;

    

    const user = users.response.filter((userFind:any )=>{
          return userFind.email === email;
    })
    if (!user) {
      return <h1>No estás registrado. Por favor, registrarse.</h1>;
    }
  

    
    return (
      <>
      <div>
          <h2><strong>Name: </strong> {user[0].name}</h2>
          <h2><strong>Email:  </strong> {user[0].email}</h2>
          <h2><strong>Role:  </strong> {user[0].role}</h2>
      </div>
      <div>
      <strong>Users: </strong> {users.response.length}
      </div>
      <div>
      <strong>Teams: </strong>  {teams.response.length}
      </div>
      <div>
      <strong>Tasks:  </strong> {tasks.response.length}
      </div>
      </>
    );
  } catch (error) {
    return <h1>Token inválido o expirado. Por favor, vuelve a iniciar sesión.</h1>;
  }
}



