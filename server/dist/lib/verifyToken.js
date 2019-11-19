"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.tokenValidation = (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json('Acceso denegado');
        }
        ;
        const payload = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'TOKENSECRET');
        req.userID = payload.data;
        req.admin = payload.cuenta;
        next();
    }
    catch (error) {
        return res.status(401).json('Acceso denegado. Token expirado');
    }
};
exports.isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.admin == 'Admin') {
        return next();
    }
    return res.status(401).json('Acceso denegado, debes ser administrador');
});
