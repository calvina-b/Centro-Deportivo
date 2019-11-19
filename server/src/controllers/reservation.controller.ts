import { Request, Response } from 'express';

import db from '../database';

export const reservation = async (req: Request, res: Response) => {
    const { deporte, fecha } = req.body;
    const date = new Date();
    const currentHour = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " ";
    const day: Date = new Date(fecha);

    if (fecha == currentDate) {
        const weekendSched = await db.query('SELECT C.id, C.deporte, C.precio_base AS precio, H.id_horario, H.hora_inicio, H.hora_termino from cancha AS C, horarios AS H WHERE deporte = ? AND hora_inicio >= ?', [deporte, currentHour]);
        res.json(weekendSched)
    } else if (fecha == currentDate && (day.getDay() == 6 || day.getDay() == 0)) {
        const weekendSched = await db.query('SELECT C.id, C.deporte, (C.precio_base*1.20) AS precio, H.id_horario, H.hora_inicio, H.hora_termino from cancha AS C, horarios AS H WHERE deporte = ? AND hora_inicio >= ?', [deporte, currentHour]);
        res.json(weekendSched)
    } else if (day.getDay() == 6 || day.getDay() == 0) {
        const weekendSched = await db.query('SELECT C.id, C.deporte, (C.precio_base*1.20) AS precio, H.id_horario, H.hora_inicio, H.hora_termino from cancha AS C, horarios AS H WHERE deporte = ?', [deporte]);
        res.json(weekendSched)
    } else {
        const weekSched = await db.query('SELECT C.id, C.deporte, C.precio_base AS precio, H.id_horario, H.hora_inicio, H.hora_termino from cancha AS C, horarios AS H WHERE deporte = ?', [deporte]);
        res.json(weekSched)
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

    await db.query('INSERT INTO equipo SET ?', [reservationTeamA]);
    await db.query('INSERT INTO equipo SET ?', [reservationTeamB]);

    res.json({message: 'Cancha reservada correctamente'})
};