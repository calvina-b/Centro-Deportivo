import { Request, Response } from 'express';
import db from '../database';
import { encryptPassword, matchPassword } from '../lib/helpers';

import jwt from 'jsonwebtoken';


export const signup = async (req: Request, res: Response) => {
    const { correo, password, nombre, nombre_usuario, direccion, rut, dV, telefono } = req.body;
    const newUser = {
        correo,
        password,
        nombre,
        nombre_usuario,
        direccion,
        rut,
        dV,
        telefono,
        tipo_cuenta: 'Cliente'
    }
    newUser.password = await encryptPassword(newUser.password);
    const result = await db.query('INSERT INTO usuario SET ?', [newUser]);
    const cuenta = await db.query('SELECT tipo_cuenta FROM usuario WHERE id_usuario = ?', [result.insertId]);
    const token = jwt.sign({ data: result.insertId, cuenta: cuenta[0].tipo_cuenta }, process.env.TOKEN_SECRET || 'TOKENSECRET', {
        expiresIn: 60 * 60 * 24
    });
    res.header('auth-token', token).json(newUser);
};

export const signin = async (req: Request, res: Response) => {
    const rows = await db.query('SELECT * FROM usuario WHERE correo = ?', [req.body.correo]);
    const user = rows[0];
    if (rows.length > 0) {
        const user = rows[0];
        const validPass = await matchPassword(req.body.password, user.password);
        if (!validPass) {
            return res.status(400).json('La contraseña es incorrecta');
        }
    } else {
        return res.status(400).json('El correo es incorrecto o no existe');
    }
    const token = jwt.sign({ data: user.id_usuario, cuenta: user.tipo_cuenta }, process.env.TOKEN_SECRET || 'TOKENSECRET', {
        expiresIn: 60 * 60 * 24
    });
    res.header('auth-token', token).json(user);
};

export const profile = async (req: Request, res: Response) => {
    const user = await db.query('SELECT * FROM usuario WHERE id_usuario = ?', [req.userID]);
    if(!user) {
        return res.status(404).json('No se encontro el usuario');
    }
    res.json(user);
};