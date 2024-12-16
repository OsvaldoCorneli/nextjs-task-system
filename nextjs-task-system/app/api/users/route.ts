import { getAllUsers, createNewUser } from '@/controllers/userController';
import { NextRequest, NextResponse } from 'next/server'; 


export async function GET(request: Request) {
    try {
        let response;
        const url = new URL(request.url); 

        response = await getAllUsers();
        return NextResponse.json({ response });

    } catch (error) {
       
        return NextResponse.json({ message: 'Error al obtener las tareas', error }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
    
        if (!data.name || !data.email || !data.password || !data.role || data.team_id != null) {
            return NextResponse.json({ message: 'Faltan datos obligatorios' }, { status: 400 });
        }

        const response = await createNewUser(data);

        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al crear usuario', error }, { status: 500 });
    }
}








