import { createTasks, getAllTasks, getUserOrTeamTasks } from '@/controllers/taskController';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: Request) {
    try {
        let response;
        const url = new URL(request.url); 

        const queryParamUser = url.searchParams.get('user'); 
        const queryParamTeam = url.searchParams.get('team'); 

        if (queryParamUser) {
            response = await getUserOrTeamTasks(queryParamUser, "user");

        } else if (queryParamTeam) {
            response = await getUserOrTeamTasks(queryParamTeam, "team");

        } else {
            response = await getAllTasks();
        }

        return NextResponse.json({ response });

    } catch (error) {
     
        return NextResponse.json({ message: 'Error al obtener las tareas', error }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        
    
        const data = await req.json();
        
      
        if (!data.title || !data.description || !data.assigned_to_user || !data.due_date || !data.priority || !data.status) {
            return NextResponse.json({ message: 'Faltan datos obligatorios' }, { status: 400 });
        }
        
       await createTasks(data);
        
        return NextResponse.json({ message: 'Tarea agregada correctamente' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al agregar tarea', error }, { status: 500 });
    }
}




