import { Request, Response } from 'express';

import db from '../database';

export const getFields = async (req: Request, res: Response) => {
    const sports = await db.query('SELECT DISTINCT deporte FROM cancha');
    res.json(sports)
}

export const postFields = async (req: Request, res: Response) => {
    const { deporte } = req.body;
    const fieldInfo = await db.query('SELECT deporte, COUNT(deporte) AS cantidad_canchas, precio_base*1.00 AS dia_normal,(precio_base*1.20) AS dia_concurrido, precio_base*1.15 AS dia_normal_pm, precio_base*1.35 AS dia_concurrido_pm FROM Cancha WHERE deporte = ? GROUP BY deporte', [deporte]);
    res.json(fieldInfo)
}