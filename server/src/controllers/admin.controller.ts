import { Request, Response } from 'express';

import db from '../database';

export const getAdmin = async (req: Request, res: Response) => {
    const usersCount = await db.query('SELECT * FROM usuario');
    const reservCount = await db.query('SELECT * FROM reserva');
    const refereeCount = await db.query('SELECT * FROM referee');
    const fieldsCount = await db.query('SELECT * FROM cancha');
    const itemsCount = await db.query('SELECT * FROM articulo');
    const schedCount = await db.query('SELECT * FROM horarios');
    res.json({ usersCount: usersCount.length , reservCount: reservCount.length, refereeCount: refereeCount.length, fieldsCount: fieldsCount.length, itemsCount: itemsCount.length, schedCount: schedCount.length });
};

// ··········USUARIOS··········
export const getUsers = async (req:Request, res: Response) => {
    const users = await db.query('SELECT * FROM usuario');
    res.json(users);
};

export const getOneUser = async (req:Request, res: Response) => {
    const { id } = req.params;
    const user = await db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
    if (user.length > 0){
        return res.json(user[0]);
    }
    res.status(404).json({message: 'Usuario no existe'});
};

export const deleteUsers = async (req:Request, res: Response) => {
    const { id } = req.params
    await db.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
    res.json({message: 'Usuario eliminado'});
};

export const updateUsers = async (req:Request, res: Response) => {
    const { id } = req.params;
    await db.query('UPDATE usuario SET ? WHERE id_usuario = ?', [req.body, id])
    res.json({message: 'Usuario modificado'});
};

// ··········CANCHAS··········
export const getFields = async (req:Request, res: Response) => {
    const fields = await db.query('SELECT * FROM cancha');
    res.json(fields);
};

export const getOneField = async (req:Request, res: Response) => {
    const { id } = req.params;
    const field = await db.query('SELECT * FROM cancha WHERE id = ?', [id]);
    if (field.length > 0){
        return res.json(field[0]);
    }
    res.status(404).json({message: 'Cancha no existe'});
};

export const addFields = async (req:Request, res: Response) => {
    await db.query('INSERT INTO cancha SET ?', [req.body]);
    res.json({message: 'Cancha agregada'});
};

export const deleteFields = async (req:Request, res: Response) => {
    const { id } = req.params
    await db.query('DELETE FROM cancha WHERE id = ?', [id]);
    res.json({message: 'Cancha eliminada'});
};

export const updateFields = async (req:Request, res: Response) => {
    const { id } = req.params;
    await db.query('UPDATE cancha SET ? WHERE id = ?', [req.body, id])
    res.json({message: 'Cancha modificada'});
};

// ··········ARBITROS··········
export const getReferees = async (req:Request, res: Response) => {
    const referees = await db.query('SELECT R.id_arbitro, R.nombre, R.rut, R.correo, C.deporte, R.nro_contacto, (C.precio_base*0.4) AS cobro FROM Referee AS R JOIN (SELECT deporte, precio_base FROM Cancha) AS C ON R.deporte = C.deporte GROUP BY R.id_arbitro');
    res.json(referees);
};

export const getOneReferee = async (req:Request, res: Response) => {
    const { id } = req.params;
    const referee = await db.query('SELECT * FROM referee WHERE id_arbitro = ?', [id]);
    if (referee.length > 0){
        return res.json(referee[0]);
    }
    res.status(404).json({message: 'Arbitro no existe'});
};

export const addReferees = async (req:Request, res: Response) => {
    await db.query('INSERT INTO referee SET ?', [req.body]);
    res.json({message: 'Arbitro agregado'});
};

export const deleteReferees = async (req:Request, res: Response) => {
    const { id } = req.params
    await db.query('DELETE FROM referee WHERE id_arbitro = ?', [id]);
    res.json({message: 'Arbitro eliminado'});
};

export const updateReferees = async (req:Request, res: Response) => {
    const { id } = req.params;
    await db.query('UPDATE referee SET ? WHERE id_arbitro = ?', [req.body, id])
    res.json({message: 'Arbitro modificado'});
};

// ··········ARTICULOS··········
export const getItems = async (req:Request, res: Response) => {
    const items = await db.query('SELECT * FROM articulo');
    res.json(items);
};

export const getOneItem = async (req:Request, res: Response) => {
    const id  = req.params.id
    const cod  = req.params.cod
    const item = await db.query('SELECT * FROM articulo WHERE cod = ? AND id_cancha = ?', [id, cod]);
    if (item.length > 0){
        return res.json(item[0]);
    }
    res.status(404).json({message: 'Articulo no existe'});
};

export const additems = async (req:Request, res: Response) => {
    await db.query('INSERT INTO articulo SET ?', [req.body]);
    res.json({message: 'Articulo agregado'});
};

export const deleteItems = async (req:Request, res: Response) => {
    const id  = req.params.id
    const cod  = req.params.cod
    await db.query('DELETE FROM articulo WHERE cod = ? AND id_cancha = ?', [id, cod]);
    res.json({message: 'Articulo eliminado'});
};

export const updateItems = async (req:Request, res: Response) => {
    const id  = req.params.id
    const cod  = req.params.cod
    await db.query('UPDATE articulo SET ? WHERE cod = ? AND id_cancha = ?', [req.body, id, cod])
    res.json({message: 'Articulo modificado'});
};

// ··········HORARIOS··········
export const getScheds = async (req:Request, res: Response) => {
    const scheds = await db.query('SELECT * FROM horarios');
    res.json(scheds);
};

export const getOneSched = async (req:Request, res: Response) => {
    const { id } = req.params;
    const sched = await db.query('SELECT * FROM horarios WHERE id_horario = ?', [id]);
    if (sched.length > 0){
        return res.json(sched[0]);
    }
    res.status(404).json({message: 'Horario no existe'});
};

export const addScheds = async (req:Request, res: Response) => {
    await db.query('INSERT INTO horarios SET ?', [req.body]);
    res.json({message: 'Horario agregado'});
};

export const deleteScheds = async (req:Request, res: Response) => {
    const { id } = req.params
    await db.query('DELETE FROM horarios WHERE id_horario = ?', [id]);
    res.json({message: 'Horario eliminado'});
};

export const updateScheds = async (req:Request, res: Response) => {
    const { id } = req.params;
    await db.query('UPDATE horarios SET ? WHERE id_horario = ?', [req.body, id])
    res.json({message: 'Horario modificado'});
};