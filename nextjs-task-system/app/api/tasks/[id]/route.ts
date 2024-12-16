import { Task } from '@/types/interfaces';
import { NextResponse } from 'next/server';
import { deleteTask, editTask, getTaskById } from '../../../../controllers/taskController';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const taskId = parseInt(params.id); 
        
        
        const task = await getTaskById(taskId);

        return new Response(JSON.stringify(task), { status: 200 }); 

    } catch (error: any) {
        console.error(error); 

        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}



export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
     
        const taskId = parseInt(params.id); 
        const data: Task = await req.json();
        
        const response = await editTask(data,taskId);
        
    
        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al editar la tarea', error }, { status: 500 });
    }


}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
       
        const taskId = parseInt(params.id); 
        const response = await deleteTask(taskId);
        
        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al editar la tarea', error }, { status: 500 });
    }


}



