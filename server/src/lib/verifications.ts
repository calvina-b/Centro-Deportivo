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

export const checkUpdateDuplicateNameOrEmailOrRutOrPhone = async (req: Request, res: Response, next: NextFunction) => {
    const email = await db.query('SELECT correo FROM usuario WHERE correo = ? AND id_usuario != ?', [req.body.correo, req.params.id]);
    const name = await db.query('SELECT nombre_usuario FROM usuario WHERE nombre_usuario = ? AND id_usuario != ?', [req.body.nombre_usuario, req.params.id]);
    const rut = await db.query('SELECT rut, dV FROM usuario WHERE rut = ? AND dV = ? AND id_usuario != ?', [req.body.rut, req.body.dV, req.params.id]);
    const phone = await db.query('SELECT telefono FROM usuario WHERE telefono = ? AND id_usuario != ?', [req.body.telefono, req.params.id]);

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

export const checkUpdateDuplicateFieldId = async (req: Request, res: Response, next: NextFunction) => {
    const fieldID = await db.query('SELECT id FROM cancha WHERE id = ? AND id != ?', [req.body.id, req.params.id]);
    if (fieldID != '') {
        return res.status(400).json('El ID de cancha ya está en uso');
    } else {
        return next();
    }
};

export const checkDuplicateRefereeEmailOrRutOrPhone = async (req: Request, res: Response, next: NextFunction) => {
    const email = await db.query('SELECT correo FROM referee WHERE correo = ?', [req.body.correo]);
    const rut = await db.query('SELECT rut FROM referee WHERE rut = ?', [req.body.rut, req.body.dV]);
    const phone = await db.query('SELECT nro_contacto FROM referee WHERE nro_contacto = ?', [req.body.nro_contacto]);

    if (email != ''){
        res.status(400).json('El correo ya está en uso');
    } else if (rut != ''){
        res.status(400).json('El rut ya está en uso');
    } else if (phone != '') {
      res.status(400).json('El teléfono ya está en uso');  
    } else {
        return next();
    }
};

export const checkUpdateDuplicateRefereeEmailOrRutOrPhone = async (req: Request, res: Response, next: NextFunction) => {
    const email = await db.query('SELECT correo FROM referee WHERE correo = ? AND id_arbitro != ?', [req.body.correo, req.params.id]);
    const rut = await db.query('SELECT rut FROM referee WHERE rut = ? AND id_arbitro != ?', [req.body.rut, req.body.dV]);
    const phone = await db.query('SELECT nro_contacto FROM referee WHERE nro_contacto = ? AND id_arbitro != ?', [req.body.nro_contacto, req.params.id]);

    if (email != ''){
        res.status(400).json('El correo ya está en uso');
    } else if (rut != ''){
        res.status(400).json('El rut ya está en uso');
    } else if (phone != '') {
      res.status(400).json('El teléfono ya está en uso');  
    } else {
        return next();
    }
};

export const checkIfExistsFieldID = async (req: Request, res: Response, next: NextFunction) => {
    const fieldID = await db.query('SELECT id FROM cancha WHERE id = ?', [req.body.id_cancha]);
    if (fieldID == ''){
        res.status(400).json('Ingresa un ID de cancha valido');
    } else {
        return next();
    }
};