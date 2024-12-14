import { getTeamById, editTeam, deleteTeam } from '@/controllers/teamController';
import { NextResponse } from 'next/server';
import { DeleteTeam } from "../../../../types/interfaces"


// Método GET para obtener una tarea por su ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const teamId = parseInt(params.id); // Accede al parámetro id desde la URL
        
        // Llamada al controller que maneja la lógica de obtención de la tarea
        const team = await getTeamById(teamId);

        return new Response(JSON.stringify(team), { status: 200 }); // Si la tarea es encontrada
    } catch (error: any) {
        console.error(error); // Puedes registrar el error en los logs para depuración

        // En caso de error, devolvemos un mensaje específico y código de estado
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        // Abrimos la base de datos
        const teamId = parseInt(params.id); // Accede al parámetro id desde la URL
        const data: DeleteTeam = await req.json();
        const response = await editTeam( data , teamId);
        
        // Respondemos con éxito
        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al editar el team', error }, { status: 500 });
    }


}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
       
        const teamId = parseInt(params.id); // Accede al parámetro id desde la URL
        const response = await deleteTeam(teamId);
        
        // Respondemos con éxito
        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al eliminar el equipo', error }, { status: 500 });
    }


}
