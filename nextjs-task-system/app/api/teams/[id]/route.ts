import { getTeamById, editTeam, deleteTeam } from '@/controllers/teamController';
import { NextResponse } from 'next/server';
import { DeleteTeam } from "../../../../types/interfaces"


export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const teamId = parseInt(params.id);


        const team = await getTeamById(teamId);

        return new Response(JSON.stringify(team), { status: 200 });
    } catch (error: any) {
        console.error(error);


        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {

        const teamId = parseInt(params.id);
        const data: DeleteTeam = await req.json();
        const response = await editTeam(data, teamId);


        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al editar el team', error }, { status: 500 });
    }


}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {

        const teamId = parseInt(params.id);
        const response = await deleteTeam(teamId);


        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al eliminar el equipo', error }, { status: 500 });
    }


}
