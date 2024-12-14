import { getAllUsers, createNewUser } from '@/controllers/userController';
import { NextRequest, NextResponse } from 'next/server'; // Importamos las clases de Next.js

// Solicitudes get para las Users
export async function GET(request: Request) {
    try {
        let response;
        const url = new URL(request.url); // Obtenemos la URL completa

        response = await getAllUsers();
        return NextResponse.json({ response });

    } catch (error) {
        // Si ocurre un error, lo devolvemos en un mensaje
        return NextResponse.json({ message: 'Error al obtener las tareas', error }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log("data", data);
        // Validación básica para asegurarse de que los campos necesarios estén presentes
        if (!data.name || !data.email || !data.password || !data.role || data.team_id != null) {
            return NextResponse.json({ message: 'Faltan datos obligatorios' }, { status: 400 });
        }

        // Inserción de la tarea en la base de datos

        const response = await createNewUser(data);


        // Respondemos con éxito
        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al crear usuario', error }, { status: 500 });
    }
}








