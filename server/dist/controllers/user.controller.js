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
const database_1 = __importDefault(require("../database"));
const helpers_1 = require("../lib/helpers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    };
    newUser.password = yield helpers_1.encryptPassword(newUser.password);
    const result = yield database_1.default.query('INSERT INTO usuario SET ?', [newUser]);
    const cuenta = yield database_1.default.query('SELECT tipo_cuenta FROM usuario WHERE id_usuario = ?', [result.insertId]);
    const token = jsonwebtoken_1.default.sign({ data: result.insertId, cuenta: cuenta[0].tipo_cuenta }, process.env.TOKEN_SECRET || 'TOKENSECRET', {
        expiresIn: 60 * 60 * 24
    });
    res.header('auth-token', token).json(newUser);
});
exports.signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rows = yield database_1.default.query('SELECT * FROM usuario WHERE correo = ?', [req.body.correo]);
    const user = rows[0];
    if (rows.length > 0) {
        const user = rows[0];
        const validPass = yield helpers_1.matchPassword(req.body.password, user.password);
        if (!validPass) {
            return res.status(400).json('La contraseña es incorrecta');
        }
    }
    else {
        return res.status(400).json('El correo es incorrecto o no existe');
    }
    const token = jsonwebtoken_1.default.sign({ data: user.id_usuario, cuenta: user.tipo_cuenta }, process.env.TOKEN_SECRET || 'TOKENSECRET', {
        expiresIn: 60 * 60 * 24
    });
    res.header('auth-token', token).json(user);
});
exports.profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield database_1.default.query('SELECT * FROM usuario WHERE id_usuario = ?', [req.userID]);
    if (!user) {
        return res.status(404).json('No se encontro el usuario');
    }
    res.json(user);
});
