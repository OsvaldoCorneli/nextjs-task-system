import { getUserById, editUser, deleteUser } from '@/controllers/userController';
import { User } from '@/types/interfaces';
import { NextResponse } from 'next/server';



export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const taskId = parseInt(params.id); 
        const user = await getUserById(taskId);

        return new Response(JSON.stringify(user), { status: 200 }); 
    } catch (error: any) {
        console.error(error); 

        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const taskId = parseInt(params.id); 
        const data: User = await req.json();
        const response = await editUser(data,taskId);
        
        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al editar el usuario', error }, { status: 500 });
    }


}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
       
        const taskId = parseInt(params.id); 
        const response = await deleteUser(taskId);
        
        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al editar la tarea', error }, { status: 500 });
    }


}
