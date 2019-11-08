import { Request, Response, NextFunction } from 'express';
import db from '../database';
import jwt from 'jsonwebtoken';

interface IPayload {
  data: string;
  cuenta: string;
  iat: number;
  exp: number;
}
declare global {
  namespace Express {
    interface Request {
      userID: string;
      admin: string;
    }
  }
}

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json('Acceso denegado');
  };
  const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'TOKENSECRET') as IPayload;
  req.userID = payload.data;
  req.admin = payload.cuenta;
  next();
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.admin == 'Admin') {
    return next()
  }
  return res.status(401).json('Acceso denegado, debes ser administrador');
};