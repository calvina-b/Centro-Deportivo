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
exports.reservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deporte, fecha } = req.body;
    const date = new Date();
    const currentHour = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " ";
    const day = new Date(fecha);
    if (fecha == currentDate) {
        const weekendSched = yield database_1.default.query('SELECT C.id, C.deporte, C.precio_base AS precio, H.id_horario, H.hora_inicio, H.hora_termino from cancha AS C, horarios AS H WHERE deporte = ? AND hora_inicio >= ?', [deporte, currentHour]);
        res.json(weekendSched);
    }
    else if (fecha == currentDate && (day.getDay() == 6 || day.getDay() == 0)) {
        const weekendSched = yield database_1.default.query('SELECT C.id, C.deporte, (C.precio_base*1.20) AS precio, H.id_horario, H.hora_inicio, H.hora_termino from cancha AS C, horarios AS H WHERE deporte = ? AND hora_inicio >= ?', [deporte, currentHour]);
        res.json(weekendSched);
    }
    else if (day.getDay() == 6 || day.getDay() == 0) {
        const weekendSched = yield database_1.default.query('SELECT C.id, C.deporte, (C.precio_base*1.20) AS precio, H.id_horario, H.hora_inicio, H.hora_termino from cancha AS C, horarios AS H WHERE deporte = ?', [deporte]);
        res.json(weekendSched);
    }
    else {
        const weekSched = yield database_1.default.query('SELECT C.id, C.deporte, C.precio_base AS precio, H.id_horario, H.hora_inicio, H.hora_termino from cancha AS C, horarios AS H WHERE deporte = ?', [deporte]);
        res.json(weekSched);
    }
});
exports.newReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reservationInfo = {
        fecha: req.body[0].fecha,
        valor_arriendo: req.body[0].valor_arriendo,
        rut_cliente: req.body[0].rut_cliente,
        id_cancha: req.body[0].id_cancha,
        deporte_cancha: req.body[0].deporte_cancha,
        id_horario: req.body[0].id_horario,
    };
    yield database_1.default.query('INSERT INTO reserva SET ?', [reservationInfo]);
    const numReservation = yield database_1.default.query('SELECT num_reserva FROM reserva WHERE rut_cliente = ? ORDER BY num_reserva DESC LIMIT 1;', [reservationInfo.rut_cliente]);
    const reservationTeamA = {
        nombre: req.body[1].nombre,
        nombre_representante: req.body[1].nombre_representante,
        correo_representante: req.body[1].correo_representante,
        telefono: req.body[1].telefono,
        num_reserva: numReservation[0].num_reserva,
    };
    const reservationTeamB = {
        nombre: req.body[2].nombre,
        nombre_representante: req.body[2].nombre_representante,
        correo_representante: req.body[2].correo_representante,
        telefono: req.body[2].telefono,
        num_reserva: numReservation[0].num_reserva,
    };
    yield database_1.default.query('INSERT INTO equipo SET ?', [reservationTeamA]);
    yield database_1.default.query('INSERT INTO equipo SET ?', [reservationTeamB]);
    res.json({ message: 'Cancha reservada correctamente' });
});
