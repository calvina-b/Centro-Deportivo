import { Request, Response, NextFunction } from 'express';
import db from '../database';

export const checkDuplicateNameOrEmailOrRutOrPhone = async (req: Request, res: Response, next: NextFunction) => {
    const email = await db.query('SELECT correo FROM usuario WHERE correo = ?', [req.body.correo]);
    const name = await db.query('SELECT nombre_usuario FROM usuario WHERE nombre_usuario = ?', [req.body.nombre_usuario]);
    const rut = await db.query('SELECT rut, dV FROM usuario WHERE rut = ? and dV = ?', [req.body.rut, req.body.dV]);
    const phone = await db.query('SELECT telefono FROM usuario WHERE telefono = ?', [req.body.telefono]);

    if (email != ''){
        res.status(400).json('El correo ya está en uso');
    } else if (name != '') {
        res.status(400).json('El nombre de usuario ya está en uso');
    } else if (rut != ''){
        res.status(400).json('El rut ya está en uso');
    } else if (phone != '') {
      res.status(400).json('El teléfono ya está en uso');  
    } else {
        return next();
    }
};

export const checkDuplicateFieldId = async (req: Request, res: Response, next: NextFunction) => {
    const fieldID = await db.query('SELECT id FROM cancha WHERE id = ?', [req.body.id]);
    if (fieldID != '') {
        return res.status(400).json('El ID de cancha ya está en uso');
    } else {
        return next();
    }
};