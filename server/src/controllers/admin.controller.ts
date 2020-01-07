import { Request, Response } from 'express';

import db from '../database';

export const getAdmin = async (req: Request, res: Response) => {
    const usersCount = await db.query('SELECT * FROM usuario');
    const reservCount = await db.query('SELECT * FROM reserva');
    const refereeCount = await db.query('SELECT * FROM referee');
    const fieldsCount = await db.query('SELECT * FROM cancha');
    const itemsCount = await db.query('SELECT * FROM articulo');
    const schedCount = await db.query('SELECT * FROM horarios');
    
    const total = await db.query("SELECT YEAR(fecha) AS Anio, MONTHNAME(fecha) AS Mes, COUNT(MONTH(fecha)) AS Cantidad_total_de_Reservas, COUNT(IF(R.deporte_cancha='Fútbol',1,NULL)) cant_reservas_futbol, COUNT(IF(R.deporte_cancha='Basketball',1,NULL)) cant_reservas_basket, COUNT(IF(R.deporte_cancha='Tenis',1,NULL)) cant_reservas_tenis, COUNT(IF(U.tipo_cuenta='Cliente',1,NULL)) cant_reservas_clientes, COUNT(IF(U.tipo_cuenta='Admin',1,NULL)) cant_reservas_admin, SUM(valor_arriendo) AS ganancias FROM Reserva AS R JOIN (Usuario AS U) ON (R.rut_cliente = U.rut) GROUP BY YEAR(fecha),MONTH(fecha) ORDER BY fecha");

    const scheds = await db.query("SELECT H.hora_inicio, H.hora_termino, COUNT(R.id_horario) AS reservas_en_horario, COUNT(IF(R.deporte_cancha='Fútbol',1,NULL)) cant_reservas_futbol, COUNT(IF(R.deporte_cancha='Basketball',1,NULL)) cant_reservas_basket, COUNT(IF(R.deporte_cancha='Tenis',1,NULL)) cant_reservas_tenis, SUM(R.valor_arriendo) AS ganancias FROM Reserva AS R JOIN (Horarios AS H) ON (R.id_horario = H.id_horario) GROUP BY R.id_horario ORDER BY COUNT(R.id_horario) DESC");

    res.json({ usersCount: usersCount.length , reservCount: reservCount.length, refereeCount: refereeCount.length, fieldsCount: fieldsCount.length, itemsCount: itemsCount.length, schedCount: schedCount.length, total, scheds });
};

// ··········USUARIOS··········
export const getUsers = async (req:Request, res: Response) => {
    const users = await db.query('SELECT * FROM usuario');

    const userReservation = await db.query("SELECT U.nombre, U.nombre_usuario, R.rut_cliente, U.dV, U.correo, COUNT(R.rut_cliente) AS cantidad_reservas FROM Reserva AS R INNER JOIN Usuario AS U ON (R.rut_cliente = U.rut) GROUP BY R.rut_cliente HAVING (COUNT(R.rut_cliente) > (SELECT (COUNT(*) / COUNT(DISTINCT rut_cliente)) FROM reserva))");

    const userReservationSport = await db.query("SELECT U.nombre, U.nombre_usuario, R.rut_cliente, U.dV, U.correo, COUNT(DISTINCT C.deporte) AS cantidad_deportes, COUNT(R.rut_cliente) AS cantidad_reservas FROM Reserva AS R INNER JOIN Cancha AS C ON (R.id_cancha = C.id) INNER JOIN Usuario AS U ON (R.rut_cliente = U.rut) GROUP BY R.rut_cliente HAVING (cantidad_deportes > 1);")

    res.json({users, userReservation, userReservationSport});
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

    const refereeReservation = await db.query('SELECT S.nombre, S.deporte, COUNT(reserved_referee) AS cantidad_reservas FROM reserva AS R JOIN referee as S ON R.reserved_referee = S.id_arbitro GROUP BY reserved_referee')

    res.json({referees, refereeReservation});
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

// ··········RESERVA··········
export const getReservation = async (req:Request, res: Response) => {
    const reservation = await db.query('SELECT R.num_reserva, R.fecha, R.id_cancha, R.deporte_cancha, H.hora_inicio, H.hora_termino, S.nombre AS nombre_arbitro, A.nombre_art AS item1, B.nombre_art AS item2 FROM Reserva AS R LEFT JOIN Horarios AS H ON R.id_horario = H.id_horario LEFT JOIN Referee AS S ON R.reserved_referee = S.id_arbitro LEFT JOIN Articulo AS A ON R.reserved_item1 = A.cod AND R.id_Cancha = A.id_cancha LEFT JOIN Articulo AS B ON R.reserved_item2 = B.cod AND R.id_cancha = B.id_cancha ORDER BY fecha, hora_inicio');
    const teams = await db.query('SELECT E.num_reserva, E.nombre, E.nombre_representante, E.correo_representante, E.telefono, R.fecha, H.hora_inicio, H.hora_termino, R.id_cancha, R.deporte_cancha FROM Equipo AS E JOIN (SELECT num_reserva, fecha, id_cancha, id_horario, deporte_cancha FROM Reserva) AS R ON (E.num_reserva = R.num_reserva) JOIN (SELECT id_horario, hora_inicio, hora_termino FROM Horarios) AS H ON (R.id_horario = H.id_horario) WHERE E.num_reserva IN (R.num_reserva) ORDER BY num_reserva');
    res.json({reservation, teams});
};

export const deleteReservation = async (req: Request, res: Response) => {
    const { num_reserva } = req.body;
    await db.query('DELETE FROM Reserva WHERE num_reserva = ?', [num_reserva]);
    await db.query('DELETE FROM Equipo WHERE num_reserva = ?', [num_reserva]);

    res.json({message: 'Reserva anulada correctamente.'})
}