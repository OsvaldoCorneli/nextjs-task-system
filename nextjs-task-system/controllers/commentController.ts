import { openDB } from '../utils/db'; // Importamos la función que abre la base de datos
import { Comment, CommentWithData, Message } from '../types/interfaces';
import { userAgent } from 'next/server';




export const getAllComments = async () => {

    
    const db = await openDB(); 
    const comments = await db.all('SELECT * FROM comments'); 

   const commentWithUser = Promise.all(comments.map(async(comment)=>{
        const user = await db.all("SELECT * FROM users WHERE user_id = ?",[comment.user_id])
        const task = await db.all("SELECT * FROM tasks WHERE task_id = ?",[comment.task_id])
        return{
            ...comment,
            user,
            task
        }
    }))

    return commentWithUser;
}

export const getCommentById = async (id: number) => {
    try {
        const db = await openDB();
        const comment = await db.get('SELECT * FROM comments WHERE comment_id = ?', [id]);
    
        if (!comment) {
            throw new Error('Comment not found');
        }
        
        const userComment = await db.all('SELECT * FROM users WHERE user_id = ?', [comment.user_id]);
        const taskComment = await db.all('SELECT * FROM tasks WHERE task_id = ?', [comment.task_id]);

        const commentWithUserAndTask = {
            comment, userComment , taskComment
        }
        
        return commentWithUserAndTask; 
    } catch (error: any) {
    
        throw new Error(error.message || 'Failed to retrieve Comment');
    }
};





export const createComment = async (body: CommentWithData ): Promise<Message> => {
    try {
        const { task_id, user_id, comment } = body;

        const db = await openDB();

        const TasksComplete = await db.all("SELECT * FROM tasks WHERE task_id = ?", [task_id])

        if(TasksComplete[0].status !== "completed"){
            return { message: 'La tarea debe estar completada para comentar', status: 400 };
        }

        const response = await db.run(
            `INSERT INTO comments (task_id, user_id, comment)
         VALUES (?, ?, ?)`,
            [task_id, user_id, comment]
        );

  
        return { message: 'Comentario agregado correctamente', status: 200 };

    } catch (error: any) {
        throw new Error(error.message);
    }
};



export const editComment = async (body: Comment, id: number): Promise<Message> => {
    try {
        const db = await openDB();

        const response = await db.get('SELECT * FROM tasks WHERE task_id = ?', [id]);

        if (!response) {
            return { message: `No se encontro commentario con el id:${id}`, status: 400 }
        }

        await db.run(`
        UPDATE comments SET 
        comment = ?
        where comment_id = ?;
        `, [body.comment , id])

        return { message: 'Commentario editado correctamente', status: 200 };

    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const deleteComment = async (id: number) : Promise<Message> => {

    const db = await openDB();
    const response = await db.get('SELECT * FROM comments WHERE comment_id = ?', [id]);

    if (!response) {
        return { message: `No se encontro commentario con el id:${id}`, status: 400 }
    }

    await db.run(`
        DELETE FROM comments WHERE comment_id = ?
        `,[id]);

    return { message: `Commentario con el id:${id} eliminada correctamente`, status: 200 };


}