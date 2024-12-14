import { openDB } from '../utils/db'; // Importamos la función que abre la base de datos
import { Message, CreateTeam, User } from '../types/interfaces';

//CONTROLLERS GET

export const getAllTeams = async () => {
    const db = await openDB();

    // Obtenemos todos los equipos
    const teams = await db.all('SELECT * FROM teams');

    // Agregamos los usuarios a cada equipo
    const teamsWithUsers = await Promise.all(
        teams.map(async (team) => {
            const users = await db.all('SELECT * FROM users WHERE team_id = ?', [team.team_id]);
            return {
                ...team,
                users,
            };
        })
    );

    return teamsWithUsers;
};


// export const getUserById = async (id: number) => {
//     try {
//         const db = await openDB();
//         const user = await db.get('SELECT * FROM users WHERE user_id = ?', [id]);
//         if (!user) {
//             throw new Error('user not found');
//         }

//         return user;
//     } catch (error: any) {
//         // Lanzamos el error con un mensaje controlado
//         throw new Error(error.message || 'Failed to retrieve user');
//     }
// };

//CONTROLER POST
export const createNewTeam = async (body: CreateTeam): Promise<Message> => {
    try {


        const db = await openDB();

        // Insertamos la tarea en la base de datos

        const response = await db.run(
            `INSERT INTO teams (name)
         VALUES (?)`,
            [body.name]
        );

        let responseAddUsers;
        if (body.users.length !== 0) {
            responseAddUsers = await addUsersToTeam(body.users);
        }



        // Retorna el ID de la tarea creada
        return { message: "Team creado correctamente", status: 200 };

    } catch (error: any) {
        throw new Error(error.message);
    }

};

export const addUsersToTeam = async (users: Array<number>) => {
    try {
        const db = await openDB();
        const lastTeam = await db.get(`
        SELECT * 
        FROM teams
        ORDER BY team_id DESC
        LIMIT 1;
      `);

        await Promise.all(
                users.map(async (user) => {
                db.run("UPDATE users SET team_id = ? WHERE user_id = ?", [lastTeam.team_id, user])
            })
        );

    } catch (error: any) {
        // Lanzamos el error con un mensaje controlado
        throw new Error(error.message || 'Failed to add users to team');
    }

}

// //CONTROLLER PUT


// export const editUser = async (body: User, id: number): Promise<Message> => {
//     try {
//         const { name, email, password, role, team_id } = body;
//         const db = await openDB();

//         const response = await db.get('SELECT * FROM users WHERE user_id = ?', [id]);

//         if (!response) {
//             return { message: `No se encontro usuario con el id:${id}`, status: 400 }
//         }

//         await db.run(`
//         UPDATE users SET
//         name = ?,
//         email = ?,
//         password = ?,
//         role = ?,
//         team_id = ?
//         where user_id = ?;
//         `, [name, email, password, role, team_id, id])

//         return { message: 'Usuario modificado correctamente', status: 200 };

//     } catch (error: any) {
//         throw new Error(error.message);
//     }
// }

// export const deleteUser = async (id: number): Promise<Message> => {

//     const db = await openDB();
//     const response = await db.get('SELECT * FROM users WHERE user_id = ?', [id]);

//     if (!response) {
//         return { message: `No se encontro usuario con el id:${id}`, status: 400 }
//     }

//     await db.run(`
//         DELETE FROM users where user_id = ?
//         `, [id]);

//     return { message: `El usuario con el id:${id} fue eliminado correctamente`, status: 200 };


// }