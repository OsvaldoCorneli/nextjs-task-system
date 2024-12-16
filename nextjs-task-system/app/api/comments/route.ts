import { createComment, getAllComments } from '@/controllers/commentController';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {

        const response = await getAllComments();
        return NextResponse.json({ response });

    } catch (error) {
        return NextResponse.json({ message: 'Error al obtener las tareas', error }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        if (!data.task_id || !data.user_id || !data.comment) {
            return NextResponse.json({ message: 'Faltan datos obligatorios' }, { status: 400 });
        }

        const response = await createComment(data);


        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al crear el comentario', error }, { status: 500 });
    }
}








