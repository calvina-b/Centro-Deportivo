import { Request, Response } from 'express';

import db from '../database';

export const getSports = async (req: Request, res: Response) => {
    const sports = await db.query('SELECT DISTINCT deporte FROM cancha');
    res.json(sports)
}

export const reservation = async (req: Request, res: Response) => {
    const { deporte, fecha } = req.body;
    const date = new Date();
    const currentHour = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " ";
    const day: Date = new Date(fecha);

    if (fecha == currentDate) {
        const weekendSched = await db.query("SELECT C.id, C.deporte, (CASE WHEN H.hora_inicio >= '12:00' THEN C.precio_base*1.15 ELSE C.precio_base END) as precio, H.id_horario, H.hora_inicio, H.hora_termino FROM cancha AS C JOIN horarios AS H ON deporte = ? AND hora_inicio >= ? LEFT JOIN registro AS R ON C.id = R.id_cancha AND disponibilidad = 'RESERVADO' AND fecha = ? AND H.id_horario = R.id_horario WHERE disponibilidad IS NULL", [deporte, currentHour, fecha]);
        return res.json(weekendSched)
    } else if (fecha == currentDate && (day.getDay() == 5 || day.getDay() == 6 || day.getDay() == 0)) {
        const weekendSched = await db.query("SELECT C.id, C.deporte, (CASE WHEN H.hora_inicio >= '12:00' THEN C.precio_base*1.35 ELSE C.precio_base*1.20 END) AS precio, H.id_horario, H.hora_inicio, H.hora_termino FROM cancha AS C JOIN horarios AS H ON deporte = ? AND hora_inicio >= ? LEFT JOIN registro AS R ON C.id = R.id_cancha AND disponibilidad = 'RESERVADO' AND fecha = ? AND H.id_horario = R.id_horario WHERE disponibilidad IS NULL", [deporte, currentHour, fecha]);
        return res.json(weekendSched)
    } else if (day.getDay() == 5 || day.getDay() == 6 || day.getDay() == 0) {
        const weekendSched = await db.query("SELECT C.id, C.deporte, (CASE WHEN H.hora_inicio >= '12:00' THEN C.precio_base*1.35 ELSE C.precio_base*1.20 END) AS precio, H.id_horario, H.hora_inicio, H.hora_termino FROM cancha AS C JOIN horarios AS H ON deporte = ? LEFT JOIN registro AS R ON C.id = R.id_cancha AND disponibilidad = 'RESERVADO' AND fecha = ? AND H.id_horario = R.id_horario WHERE disponibilidad IS NULL", [deporte, fecha]);
        return res.json(weekendSched)
    } else {
        const weekSched = await db.query("SELECT C.id, C.deporte, (CASE WHEN H.hora_inicio >= '12:00' THEN C.precio_base*1.15 ELSE C.precio_base END) AS precio, H.id_horario, H.hora_inicio, H.hora_termino FROM cancha AS C JOIN horarios AS H ON deporte = ? LEFT JOIN registro AS R ON C.id = R.id_cancha AND disponibilidad = 'RESERVADO' AND fecha = ? AND H.id_horario = R.id_horario WHERE disponibilidad IS NULL", [deporte, fecha]);
        return res.json(weekSched)
    }
};

export const reservationItemsAndReferee = async (req: Request, res: Response) => {
    const { id_cancha, id_horario, fecha } = req.body;
    const items = await db.query('SELECT * FROM articulo WHERE id_cancha = ?', [id_cancha]);

    const referee = await db.query('SELECT R.id_arbitro, R.nombre, (C.precio_base*0.4) as cobro FROM articulo AS A LEFT JOIN Referee as R ON A.deporte_cancha = R.deporte LEFT JOIN Cancha AS C ON A.id_cancha = C.id WHERE id_cancha = ? GROUP BY nombre', [id_cancha]);

    const reservedReferee = await db.query("SELECT R.id_arbitro, R.nombre, (C.precio_base*0.4) AS cobro FROM articulo AS A LEFT JOIN Referee as R ON A.deporte_cancha = R.deporte LEFT JOIN Cancha AS C ON A.id_cancha = C.id LEFT JOIN reserva AS S ON S.reserved_referee IN (R.id_arbitro) WHERE (A.id_cancha = ? AND S.fecha = ? AND S.id_horario = ?) GROUP BY nombre", [id_cancha, fecha, id_horario]);

    if (reservedReferee == '') {
        return res.json({items, referee})
    } else {
        return res.json({items, reservedReferee})
    }
};

export const newReservation = async (req: Request, res: Response) => {
    const reservationInfo = {
        fecha: req.body[0].fecha,
        valor_arriendo: req.body[0].valor_arriendo,
        rut_cliente: req.body[0].rut_cliente,
        id_cancha: req.body[0].id_cancha,
        deporte_cancha: req.body[0].deporte_cancha,
        id_horario: req.body[0].id_horario,
        reserved_referee: req.body[0].reserved_referee,
        reserved_item1: req.body[0].reserved_item1,
        reserved_item2: req.body[0].reserved_item2,
    }

    await db.query('INSERT INTO reserva SET ?', [reservationInfo]);
    const numReservation = await db.query('SELECT num_reserva FROM reserva WHERE rut_cliente = ? ORDER BY num_reserva DESC LIMIT 1;', [reservationInfo.rut_cliente]);
    
    const reservationTeamA = {
        nombre: req.body[1].nombre,
        nombre_representante: req.body[1].nombre_representante,
        correo_representante: req.body[1].correo_representante,
        telefono: req.body[1].telefono,
        num_reserva: numReservation[0].num_reserva,
    }
    const reservationTeamB = {
        nombre: req.body[2].nombre,
        nombre_representante: req.body[2].nombre_representante,
        correo_representante: req.body[2].correo_representante,
        telefono: req.body[2].telefono,
        num_reserva: numReservation[0].num_reserva,
    }

    const registry = {
        num_reserva: numReservation[0].num_reserva,
        fecha: req.body[0].fecha,
        id_horario: req.body[0].id_horario,
        id_cancha: req.body[0].id_cancha,
    }

    await db.query('INSERT INTO equipo SET ?', [reservationTeamA]);
    await db.query('INSERT INTO equipo SET ?', [reservationTeamB]);
    await db.query('INSERT INTO registro SET ?', [registry]);

    res.json({message: 'Cancha reservada correctamente'})
};

export const getActiveReservation = async (req: Request, res: Response) => {
    const { rut_cliente } = req.body;
    const date = new Date();
    const currentHour = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " ";
    const active = await db.query('SELECT R.num_reserva, R.fecha, R.id_cancha, R.deporte_cancha, H.hora_inicio, H.hora_termino, S.nombre AS nombre_arbitro, A.nombre_art AS item1, B.nombre_art AS item2 FROM Reserva AS R LEFT JOIN Horarios AS H ON R.id_horario = H.id_horario LEFT JOIN Referee AS S ON R.reserved_referee = S.id_arbitro LEFT JOIN Articulo AS A ON R.reserved_item1 = A.cod AND R.id_cancha = A.id_cancha LEFT JOIN Articulo AS B ON R.reserved_item2 = B.cod AND R.id_cancha = B.id_cancha WHERE rut_cliente = ? AND (CASE WHEN fecha = ? THEN fecha >= ? AND hora_termino > ? ELSE fecha > ? END) ORDER BY fecha, hora_inicio', [rut_cliente, currentDate, currentDate, currentHour, currentDate]);
    
    res.json(active)
}

export const deleteReservation = async (req: Request, res: Response) => {
    const { num_reserva } = req.body;
    await db.query('DELETE FROM Reserva WHERE num_reserva = ?', [num_reserva]);
    await db.query('DELETE FROM Equipo WHERE num_reserva = ?', [num_reserva]);

    res.json({message: 'Reserva anulada correctamente.'})
}

export const getHistoryReservation = async (req: Request, res: Response) => {
    const { rut_cliente } = req.body;
    const history = await db.query('SELECT R.num_reserva, R.fecha, R.id_cancha, R.deporte_cancha, H.hora_inicio, H.hora_termino, S.nombre AS nombre_arbitro, A.nombre_art AS item1, B.nombre_art AS item2 FROM Reserva AS R LEFT JOIN Horarios AS H ON R.id_horario = H.id_horario LEFT JOIN Referee AS S ON R.reserved_referee = S.id_arbitro LEFT JOIN Articulo AS A ON R.reserved_item1 = A.cod AND R.id_cancha = A.id_cancha LEFT JOIN Articulo AS B ON R.reserved_item2 = B.cod AND R.id_cancha = B.id_cancha WHERE rut_cliente = ? ORDER BY fecha, hora_inicio', [rut_cliente]);
    
    res.json(history)
}