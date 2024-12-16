import { createNewTeam, getAllTeams } from '@/controllers/teamController';
import { NextRequest, NextResponse } from 'next/server'; 


export async function GET(request: Request) {
    try {

        const response = await getAllTeams();

        return NextResponse.json({ response });

    } catch (error) {
        return NextResponse.json({ message: 'Error al obtener los equipos', error }, { status: 500 });
    }
}



export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        if (!data.name) {
            return NextResponse.json({ message: 'Faltan datos obligatorios' }, { status: 400 });
        }

        const response = await createNewTeam(data);

        return NextResponse.json({ message: 'Tarea agregada correctamente' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al agregar tarea', error }, { status: 500 });
    }
}




