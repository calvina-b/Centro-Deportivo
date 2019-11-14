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
exports.horario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deporte, fecha } = req.body;
    const now = new Date(fecha);
    if (now.getDay() == 6 || now.getDay() == 0) {
        const horariofinde = yield database_1.default.query('SELECT C.id, C.deporte, (C.precio_base*1.20) AS precio, H.id_horario, H.hora_inicio, H.hora_termino from cancha AS C, horarios AS H WHERE deporte = ?', [deporte]);
        res.json(horariofinde);
    }
    else {
        const horariosemana = yield database_1.default.query('SELECT C.id, C.deporte, C.precio_base AS precio, H.id_horario, H.hora_inicio, H.hora_termino from cancha AS C, horarios AS H WHERE deporte = ?', [deporte]);
        res.json(horariosemana);
    }
});
