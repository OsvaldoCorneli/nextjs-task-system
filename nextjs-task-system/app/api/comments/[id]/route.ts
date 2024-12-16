import { NextResponse } from 'next/server';
import { Comment } from "../../../../types/interfaces"
import { deleteComment, editComment, getCommentById } from '@/controllers/commentController';


export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const commentId = parseInt(params.id);


        const comment = await getCommentById(commentId);

        return new Response(JSON.stringify(comment), { status: 200 });
    } catch (error: any) {
        console.error(error);


        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {

        const commentId = parseInt(params.id);
        const data: Comment = await req.json();
        const response = await editComment(data, commentId);


        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al editar el team', error }, { status: 500 });
    }


}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {

        const commentId = parseInt(params.id);
        const response = await deleteComment(commentId);


        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error al eliminar el equipo', error }, { status: 500 });
    }


}
