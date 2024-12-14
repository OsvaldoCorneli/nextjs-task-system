import { openDB } from '../utils/db'; // Importamos la función que abre la base de datos
import { Tasks, Message } from '../types/interfaces';

//CONTROLLERS GET

export const getAllTasks = async () => {

    const db = await openDB(); // Abrimos la base de datos;
    const tasks = await db.all('SELECT * FROM tasks'); // Obtenemos todas las tareas
    return tasks;
}

export const getTaskById = async (id: number) => {
    try {
        const db = await openDB();
        const task = await db.get('SELECT * FROM tasks WHERE task_id = ?', [id]);
        if (!task) {
            throw new Error('Task not found');
        }

        return task;  // Si la tarea existe, la retornamos
    } catch (error: any) {
        // Lanzamos el error con un mensaje controlado
        throw new Error(error.message || 'Failed to retrieve task');
    }
};

export const getUserOrTeamTasks = async (id: string, type: string) => {
    try {
        // Asegúrate de que el id es un número válido
        const idNumber: number = parseInt(id);
        if (isNaN(idNumber)) {
            throw new Error("El ID proporcionado no es válido.");
        }
        const db = await openDB();

        // Obtén las tareas asignadas al usuario o equipo con el ID proporcionado

        let tasks;
        switch (type) {
            case "user":
                tasks = await db.all('SELECT * FROM tasks WHERE assigned_to_user = ?', [idNumber]);
                break
            case "team":
                tasks = await db.all('SELECT * FROM tasks WHERE assigned_to_team = ?', [idNumber]);
                break
            default:
                throw new Error("La solicitud no es User o Team");
        }

        // Si no se encontraron tareas, lanza un error
        if (tasks.length === 0) {
            throw new Error('No se ha encontraron asignacion a esta tarea');
        }

        return tasks;

    } catch (error: any) {
        throw new Error(error.message || 'Error al obtener las tareas del usuario');
    }
};

//CONTROLER POST


export const createTasks = async (body: Tasks): Promise<number> => {
    try {
        const { title, description, assigned_to_user, assigned_to_team, due_date, priority, status } = body;

        const db = await openDB();

        // Insertamos la tarea en la base de datos
        const response = await db.run(
            `INSERT INTO tasks (title, description, assigned_to_user, assigned_to_team, due_date, priority, status)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, description, assigned_to_user, assigned_to_team, due_date, priority, status]
        );

        // Retorna el ID de la tarea creada
        return response.lastID || 0;

    } catch (error: any) {
        throw new Error(error.message);
    }
};


//CONTROLLER PUT


export const editTask = async (body: Tasks, id: number): Promise<Message> => {
    try {
        const db = await openDB();

        const response = await db.get('SELECT * FROM tasks WHERE task_id = ?', [id]);

        if (!response) {
            return { message: `No se encontro tarea con el id:${id}`, status: 400 }
        }

        await db.run(`
        UPDATE tasks SET 
        title = ?,
        description = ?,
        assigned_to_user = ?,
        assigned_to_team = ?,
        due_date = ?,
        priority = ?,
        status = ?
        where task_id = ?;
        `, [body.title, body.description, body.assigned_to_user, body.assigned_to_team, body.due_date, body.priority, body.status, id])

        return { message: 'Tarea agregada correctamente', status: 200 };

    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const deleteTask = async (id: number) : Promise<Message> => {

    const db = await openDB();
    const response = await db.get('SELECT * FROM tasks WHERE task_id = ?', [id]);

    if (!response) {
        return { message: `No se encontro tarea con el id:${id}`, status: 400 }
    }

    await db.run(`
        DELETE FROM tasks where task_id = ?
        `,[id]);

    return { message: `Tarea con el id:${id} eliminada correctamente`, status: 200 };


}