import { getUserById, editUser, deleteUser } from '@/controllers/userController';
import { User } from '@/types/interfaces';
import { NextResponse } from 'next/server';


// Método GET para obtener una tarea por su ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const taskId = parseInt(params.id); // Accede al parámetro id desde la URL
        
        // Llamada al controller que maneja la lógica de obtención de la tarea
        const user = await getUserById(taskId);

        return new Response(JSON.stringify(user), { status: 200 }); // Si la tarea es encontrada
    } catch (error: any) {
        console.error(error); // Puedes registrar el error en los logs para depuración

        // En caso de error, devolvemos un mensaje específico y código de estado
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        // Abrimos la base de datos
        const taskId = parseInt(params.id); // Accede al parámetro id desde la URL
        const data: User = await req.json();
        const response = await editUser(data,taskId);
        
        // Respondemos con éxito
        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al editar el usuario', error }, { status: 500 });
    }


}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
       
        const taskId = parseInt(params.id); // Accede al parámetro id desde la URL
        const response = await deleteUser(taskId);
        
        // Respondemos con éxito
        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al editar la tarea', error }, { status: 500 });
    }


}
