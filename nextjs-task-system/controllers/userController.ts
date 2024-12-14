import { openDB } from '../utils/db'; // Importamos la función que abre la base de datos
import { Message, User } from '../types/interfaces';

//CONTROLLERS GET

export const getAllUsers = async () => {

    const db = await openDB();
    const users = await db.all('SELECT * FROM users');
    return users;
}

export const getUserById = async (id: number) => {
    try {
        const db = await openDB();
        const user = await db.get('SELECT * FROM users WHERE user_id = ?', [id]);
        if (!user) {
            throw new Error('user not found');
        }

        return user;  
    } catch (error: any) {
        // Lanzamos el error con un mensaje controlado
        throw new Error(error.message || 'Failed to retrieve user');
    }
};

//CONTROLER POST
export const createNewUser = async (body: User): Promise<Message> => {
    try {
        const { name, email, password, role, team_id } = body;

        const db = await openDB();

        // Insertamos la tarea en la base de datos
        const response = await db.run(
            `INSERT INTO users (name, email, password, role, team_id)
         VALUES (?, ?, ?, ?, ?)`,
            [name, email, password, role, team_id]
        );

        // Retorna el ID de la tarea creada
        return {message: "Usuario creado correctamente", status:200};

    } catch (error: any) {
        throw new Error(error.message);
    }

};


//CONTROLLER PUT


export const editUser = async (body: User, id: number): Promise<Message> => {
    try {
        const {name, email, password, role, team_id} = body;
        const db = await openDB();
     
        const response = await db.get('SELECT * FROM users WHERE user_id = ?', [id]);

        if (!response) {
            return { message: `No se encontro usuario con el id:${id}`, status: 400 }
        }

        await db.run(`
        UPDATE users SET 
        name = ?,
        email = ?,
        password = ?,
        role = ?,
        team_id = ?
        where user_id = ?;
        `, [name, email, password, role, team_id, id])

        return { message: 'Usuario modificado correctamente', status: 200 };

    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const deleteUser = async (id: number) : Promise<Message> => {

    const db = await openDB();
    const response = await db.get('SELECT * FROM users WHERE user_id = ?', [id]);

    if (!response) {
        return { message: `No se encontro usuario con el id:${id}`, status: 400 }
    }

    await db.run(`
        DELETE FROM users where user_id = ?
        `,[id]);

    return { message: `El usuario con el id:${id} fue eliminado correctamente`, status: 200 };


}