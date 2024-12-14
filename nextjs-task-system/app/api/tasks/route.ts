import { createTasks, getAllTasks, getUserOrTeamTasks } from '@/controllers/taskController';
import { openDB } from '@/utils/db';
import { NextRequest, NextResponse } from 'next/server'; // Importamos las clases de Next.js


// Solicitudes get para las Tasks
export async function GET(request: Request) {
    try {
        let response;
        const url = new URL(request.url); // Obtenemos la URL completa

        const queryParamUser = url.searchParams.get('user'); // Obtenemos un parámetro de la query
        const queryParamTeam = url.searchParams.get('team'); // Obtenemos un parámetro de la query

        if (queryParamUser) {
            response = await getUserOrTeamTasks(queryParamUser, "user");

        } else if (queryParamTeam) {
            response = await getUserOrTeamTasks(queryParamTeam, "team");

        } else {
            response = await getAllTasks();
        }

        return NextResponse.json({ response });

    } catch (error) {
        // Si ocurre un error, lo devolvemos en un mensaje
        return NextResponse.json({ message: 'Error al obtener las tareas', error }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        // Abrimos la base de datos
        const db = await openDB();
        
        // Obtenemos los datos del cuerpo de la solicitud
        const data = await req.json();
        
        // Validación básica para asegurarse de que los campos necesarios estén presentes
        if (!data.title || !data.description || !data.assigned_to_user || !data.due_date || !data.priority || !data.status) {
            return NextResponse.json({ message: 'Faltan datos obligatorios' }, { status: 400 });
        }
        
        // Inserción de la tarea en la base de datos

       await createTasks(data);
            

        // Respondemos con éxito
        return NextResponse.json({ message: 'Tarea agregada correctamente' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al agregar tarea', error }, { status: 500 });
    }
}




