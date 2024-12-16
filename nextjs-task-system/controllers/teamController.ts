import { openDB } from '../utils/db'; 
import { Message, CreateTeam, User, DeleteTeam } from '../types/interfaces';

export const getAllTeams = async () => {
    const db = await openDB();

    const teams = await db.all('SELECT * FROM teams');

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


export const getTeamById = async (id: number) => {
    try {
        const db = await openDB();
        const team = await db.get('SELECT * FROM teams WHERE team_id = ?', [id]);

        if (!team) {
            throw new Error('Team not found');
        }

        const usersTeam = await db.all('SELECT * FROM users WHERE team_id = ?', [team.team_id]);

        const teamWithUsers = {
            team, usersTeam
        }

        return teamWithUsers;

    } catch (error: any) {
        throw new Error(error.message || 'Failed to retrieve team');
    }
};

export const createNewTeam = async (body: CreateTeam): Promise<Message> => {
    try {


        const db = await openDB();

        const response = await db.run(
            `INSERT INTO teams (name)
         VALUES (?)`,
            [body.name]
        );

        let responseAddUsers;
        if (body.users.length !== 0) {
            responseAddUsers = await addUsersToTeam(body.users);
        }

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
        throw new Error(error.message || 'Failed to add users to team');
    }

}


export const editTeam = async (body: DeleteTeam, id: number): Promise<Message> => {
    try {
        const { name, users , usersDelete} = body;
        const db = await openDB();

        const response = await db.get('SELECT * FROM teams WHERE team_id = ?', [id]);

        if (!response) {
            return { message: `No se encontro team con el id:${id}`, status: 400 }
        }


        if (name != null) {
            await db.run(`
                UPDATE teams SET
                name = ?
                where team_id = ?;
                `, [name, id])
        }
        if (users.length != 0) {
            Promise.all(users.map(async(user)=>{
                
                await db.run(`
                    UPDATE users SET
                    team_id = ?
                     where user_id = ?;
                    `, [id, user])
            }))
            
        }

        if(usersDelete.length != 0){

            Promise.all(usersDelete.map(async(userToDelete)=>{
                
                await db.run(`
                    UPDATE users SET
                    team_id = ?
                     where user_id = ?;
                    `, [null , userToDelete])
          }))
        } 

        return { message: 'team modificado correctamente', status: 200 };

    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const deleteTeam = async (id: number): Promise<Message> => {

    const db = await openDB();
    const response = await db.get('SELECT * FROM teams WHERE team_id = ?', [id]);

    if (!response) {
        return { message: `No se encontro team con el id:${id}`, status: 400 }
    }

    await db.run(
        `
        UPDATE users SET team_id = ? WHERE team_id = ?;
        `,[null, id]
    )
    await db.run(`
        DELETE FROM teams where team_id = ?
        `, [id]);

    return { message: `El equipo con el id:${id} fue eliminado correctamente`, status: 200 };


}