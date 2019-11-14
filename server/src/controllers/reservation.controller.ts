import { Request, Response } from 'express';

import db from '../database';

export const reservation = async (req: Request, res: Response) => {
    const { deporte, fecha } = req.body;
    const now:Date = new Date(fecha);
    if (now.getDay() == 6 || now.getDay() == 0) {
        const weekendSched = await db.query('SELECT C.id, C.deporte, (C.precio_base*1.20) AS precio, H.id_horario, H.hora_inicio, H.hora_termino from cancha AS C, horarios AS H WHERE deporte = ?', [deporte]);
        res.json(weekendSched)
    } else {
        const weekSched = await db.query('SELECT C.id, C.deporte, C.precio_base AS precio, H.id_horario, H.hora_inicio, H.hora_termino from cancha AS C, horarios AS H WHERE deporte = ?', [deporte]);
        res.json(weekSched)
    }
};