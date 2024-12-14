import { createNewTeam, getAllTeams } from '@/controllers/teamController';
import { NextRequest, NextResponse } from 'next/server'; // Importamos las clases de Next.js


// Solicitudes get para las Tasks
export async function GET(request: Request) {
    try {
        let response;
        const url = new URL(request.url); // Obtenemos la URL completa

        response = await getAllTeams();
        

        return NextResponse.json({ response });

    } catch (error) {
        // Si ocurre un error, lo devolvemos en un mensaje
        return NextResponse.json({ message: 'Error al obtener los equipos', error }, { status: 500 });
    }
}



export async function POST(req: NextRequest) {
    try {   
        // Obtenemos los datos del cuerpo de la solicitud
        const data = await req.json();
        // Validación básica para asegurarse de que los campos necesarios estén presentes
        if (!data.name) {
            return NextResponse.json({ message: 'Faltan datos obligatorios' }, { status: 400 });
        } 
        // Inserción de team en la base de datos

        const response = await createNewTeam(data);
            

        // Respondemos con éxito
        return NextResponse.json({ message: 'Tarea agregada correctamente' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al agregar tarea', error }, { status: 500 });
    }
}




