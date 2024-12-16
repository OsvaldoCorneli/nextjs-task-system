export interface Task {
    title: string;              // Título de la tarea
    description: string;        // Descripción de la tarea
    assigned_to_user: number;   // ID del usuario asignado
    assigned_to_team: number;   // ID del equipo asignado
    due_date: string;           // Fecha de vencimiento (ISO 8601)
    priority: string;          
    status: string;            
  }
  

  export interface Message {
    message: string;
    status: number

  }

  export interface User{
    name: string;
    email: string;
    password: string;
    role: string | null;
    team_id: number | null;
  }

  export interface userWithId extends User{
    user_id: number;
  }


  export interface CreateTeam{
    name: string;
    users: Array<number>;
  }


  export interface DeleteTeam extends CreateTeam{ 
    usersDelete: Array<number>

  }
  
  export interface Comment{
    comment: string
  }

  export interface CommentWithData extends Comment{
    task_id: number, 
    user_id: number, 
    
  }

 