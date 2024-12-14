import { createComment, getAllComments } from '@/controllers/commentController';
import { NextRequest, NextResponse } from 'next/server'; // Importamos las clases de Next.js

// Solicitudes get para las Users
export async function GET(request: Request) {
    try {

        const response = await getAllComments();
        return NextResponse.json({ response });

    } catch (error) {
        // Si ocurre un error, lo devolvemos en un mensaje
        return NextResponse.json({ message: 'Error al obtener las tareas', error }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log(data)
        // Validación básica para asegurarse de que los campos necesarios estén presentes
        if (!data.task_id || !data.user_id || !data.comment ) {
            return NextResponse.json({ message: 'Faltan datos obligatorios' }, { status: 400 });
        }

        // Inserción de la tarea en la base de datos

        const response = await createComment(data);


        // Respondemos con éxito
        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al crear el comentario', error }, { status: 500 });
    }
}








