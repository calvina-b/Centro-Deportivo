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
exports.checkDuplicateNameOrEmailOrRutOrPhone = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = yield database_1.default.query('SELECT correo FROM usuario WHERE correo = ?', [req.body.correo]);
    const name = yield database_1.default.query('SELECT nombre_usuario FROM usuario WHERE nombre_usuario = ?', [req.body.nombre_usuario]);
    const rut = yield database_1.default.query('SELECT rut, dV FROM usuario WHERE rut = ? and dV = ?', [req.body.rut, req.body.dV]);
    const phone = yield database_1.default.query('SELECT telefono FROM usuario WHERE telefono = ?', [req.body.telefono]);
    if (email != '') {
        res.status(400).json('El correo ya está en uso');
    }
    else if (name != '') {
        res.status(400).json('El nombre de usuario ya está en uso');
    }
    else if (rut != '') {
        res.status(400).json('El rut ya está en uso');
    }
    else if (phone != '') {
        res.status(400).json('El teléfono ya está en uso');
    }
    else {
        return next();
    }
});
exports.checkDuplicateFieldId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const fieldID = yield database_1.default.query('SELECT id FROM cancha WHERE id = ?', [req.body.id]);
    if (fieldID != '') {
        return res.status(400).json('El ID de cancha ya está en uso');
    }
    else {
        return next();
    }
});
