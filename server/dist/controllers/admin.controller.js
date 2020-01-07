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
exports.getAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usersCount = yield database_1.default.query('SELECT * FROM usuario');
    const reservCount = yield database_1.default.query('SELECT * FROM reserva');
    const refereeCount = yield database_1.default.query('SELECT * FROM referee');
    const fieldsCount = yield database_1.default.query('SELECT * FROM cancha');
    const itemsCount = yield database_1.default.query('SELECT * FROM articulo');
    const schedCount = yield database_1.default.query('SELECT * FROM horarios');
    const total = yield database_1.default.query("SELECT YEAR(fecha) AS Anio, MONTHNAME(fecha) AS Mes, COUNT(MONTH(fecha)) AS Cantidad_total_de_Reservas, COUNT(IF(R.deporte_cancha='Fútbol',1,NULL)) cant_reservas_futbol, COUNT(IF(R.deporte_cancha='Basketball',1,NULL)) cant_reservas_basket, COUNT(IF(R.deporte_cancha='Tenis',1,NULL)) cant_reservas_tenis, COUNT(IF(U.tipo_cuenta='Cliente',1,NULL)) cant_reservas_clientes, COUNT(IF(U.tipo_cuenta='Admin',1,NULL)) cant_reservas_admin, SUM(valor_arriendo) AS ganancias FROM Reserva AS R JOIN (Usuario AS U) ON (R.rut_cliente = U.rut) GROUP BY YEAR(fecha),MONTH(fecha) ORDER BY fecha");
    const scheds = yield database_1.default.query("SELECT H.hora_inicio, H.hora_termino, COUNT(R.id_horario) AS reservas_en_horario, COUNT(IF(R.deporte_cancha='Fútbol',1,NULL)) cant_reservas_futbol, COUNT(IF(R.deporte_cancha='Basketball',1,NULL)) cant_reservas_basket, COUNT(IF(R.deporte_cancha='Tenis',1,NULL)) cant_reservas_tenis, SUM(R.valor_arriendo) AS ganancias FROM Reserva AS R JOIN (Horarios AS H) ON (R.id_horario = H.id_horario) GROUP BY R.id_horario ORDER BY COUNT(R.id_horario) DESC");
    res.json({ usersCount: usersCount.length, reservCount: reservCount.length, refereeCount: refereeCount.length, fieldsCount: fieldsCount.length, itemsCount: itemsCount.length, schedCount: schedCount.length, total, scheds });
});
// ··········USUARIOS··········
exports.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield database_1.default.query('SELECT * FROM usuario');
    const userReservation = yield database_1.default.query("SELECT U.nombre, U.nombre_usuario, R.rut_cliente, U.dV, U.correo, COUNT(R.rut_cliente) AS cantidad_reservas FROM Reserva AS R INNER JOIN Usuario AS U ON (R.rut_cliente = U.rut) GROUP BY R.rut_cliente HAVING (COUNT(R.rut_cliente) > (SELECT (COUNT(*) / COUNT(DISTINCT rut_cliente)) FROM reserva))");
    const userReservationSport = yield database_1.default.query("SELECT U.nombre, U.nombre_usuario, R.rut_cliente, U.dV, U.correo, COUNT(DISTINCT C.deporte) AS cantidad_deportes, COUNT(R.rut_cliente) AS cantidad_reservas FROM Reserva AS R INNER JOIN Cancha AS C ON (R.id_cancha = C.id) INNER JOIN Usuario AS U ON (R.rut_cliente = U.rut) GROUP BY R.rut_cliente HAVING (cantidad_deportes > 1);");
    res.json({ users, userReservation, userReservationSport });
});
exports.getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield database_1.default.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
    if (user.length > 0) {
        return res.json(user[0]);
    }
    res.status(404).json({ message: 'Usuario no existe' });
});
exports.deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield database_1.default.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
    res.json({ message: 'Usuario eliminado' });
});
exports.updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield database_1.default.query('UPDATE usuario SET ? WHERE id_usuario = ?', [req.body, id]);
    res.json({ message: 'Usuario modificado' });
});
// ··········CANCHAS··········
exports.getFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = yield database_1.default.query('SELECT * FROM cancha');
    res.json(fields);
});
exports.getOneField = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const field = yield database_1.default.query('SELECT * FROM cancha WHERE id = ?', [id]);
    if (field.length > 0) {
        return res.json(field[0]);
    }
    res.status(404).json({ message: 'Cancha no existe' });
});
exports.addFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.query('INSERT INTO cancha SET ?', [req.body]);
    res.json({ message: 'Cancha agregada' });
});
exports.deleteFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield database_1.default.query('DELETE FROM cancha WHERE id = ?', [id]);
    res.json({ message: 'Cancha eliminada' });
});
exports.updateFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield database_1.default.query('UPDATE cancha SET ? WHERE id = ?', [req.body, id]);
    res.json({ message: 'Cancha modificada' });
});
// ··········ARBITROS··········
exports.getReferees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const referees = yield database_1.default.query('SELECT R.id_arbitro, R.nombre, R.rut, R.correo, C.deporte, R.nro_contacto, (C.precio_base*0.4) AS cobro FROM Referee AS R JOIN (SELECT deporte, precio_base FROM Cancha) AS C ON R.deporte = C.deporte GROUP BY R.id_arbitro');
    const refereeReservation = yield database_1.default.query('SELECT S.nombre, S.deporte, COUNT(reserved_referee) AS cantidad_reservas FROM reserva AS R JOIN referee as S ON R.reserved_referee = S.id_arbitro GROUP BY reserved_referee');
    res.json({ referees, refereeReservation });
});
exports.getOneReferee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const referee = yield database_1.default.query('SELECT * FROM referee WHERE id_arbitro = ?', [id]);
    if (referee.length > 0) {
        return res.json(referee[0]);
    }
    res.status(404).json({ message: 'Arbitro no existe' });
});
exports.addReferees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.query('INSERT INTO referee SET ?', [req.body]);
    res.json({ message: 'Arbitro agregado' });
});
exports.deleteReferees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield database_1.default.query('DELETE FROM referee WHERE id_arbitro = ?', [id]);
    res.json({ message: 'Arbitro eliminado' });
});
exports.updateReferees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield database_1.default.query('UPDATE referee SET ? WHERE id_arbitro = ?', [req.body, id]);
    res.json({ message: 'Arbitro modificado' });
});
// ··········ARTICULOS··········
exports.getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield database_1.default.query('SELECT * FROM articulo');
    res.json(items);
});
exports.getOneItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const cod = req.params.cod;
    const item = yield database_1.default.query('SELECT * FROM articulo WHERE cod = ? AND id_cancha = ?', [id, cod]);
    if (item.length > 0) {
        return res.json(item[0]);
    }
    res.status(404).json({ message: 'Articulo no existe' });
});
exports.additems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.query('INSERT INTO articulo SET ?', [req.body]);
    res.json({ message: 'Articulo agregado' });
});
exports.deleteItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const cod = req.params.cod;
    yield database_1.default.query('DELETE FROM articulo WHERE cod = ? AND id_cancha = ?', [id, cod]);
    res.json({ message: 'Articulo eliminado' });
});
exports.updateItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const cod = req.params.cod;
    yield database_1.default.query('UPDATE articulo SET ? WHERE cod = ? AND id_cancha = ?', [req.body, id, cod]);
    res.json({ message: 'Articulo modificado' });
});
// ··········HORARIOS··········
exports.getScheds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scheds = yield database_1.default.query('SELECT * FROM horarios');
    res.json(scheds);
});
exports.getOneSched = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const sched = yield database_1.default.query('SELECT * FROM horarios WHERE id_horario = ?', [id]);
    if (sched.length > 0) {
        return res.json(sched[0]);
    }
    res.status(404).json({ message: 'Horario no existe' });
});
exports.addScheds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.default.query('INSERT INTO horarios SET ?', [req.body]);
    res.json({ message: 'Horario agregado' });
});
exports.deleteScheds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield database_1.default.query('DELETE FROM horarios WHERE id_horario = ?', [id]);
    res.json({ message: 'Horario eliminado' });
});
exports.updateScheds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield database_1.default.query('UPDATE horarios SET ? WHERE id_horario = ?', [req.body, id]);
    res.json({ message: 'Horario modificado' });
});
// ··········RESERVA··········
exports.getReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reservation = yield database_1.default.query('SELECT R.num_reserva, R.fecha, R.id_cancha, R.deporte_cancha, H.hora_inicio, H.hora_termino, S.nombre AS nombre_arbitro, A.nombre_art AS item1, B.nombre_art AS item2 FROM Reserva AS R LEFT JOIN Horarios AS H ON R.id_horario = H.id_horario LEFT JOIN Referee AS S ON R.reserved_referee = S.id_arbitro LEFT JOIN Articulo AS A ON R.reserved_item1 = A.cod AND R.id_Cancha = A.id_cancha LEFT JOIN Articulo AS B ON R.reserved_item2 = B.cod AND R.id_cancha = B.id_cancha ORDER BY fecha, hora_inicio');
    const teams = yield database_1.default.query('SELECT E.num_reserva, E.nombre, E.nombre_representante, E.correo_representante, E.telefono, R.fecha, H.hora_inicio, H.hora_termino, R.id_cancha, R.deporte_cancha FROM Equipo AS E JOIN (SELECT num_reserva, fecha, id_cancha, id_horario, deporte_cancha FROM Reserva) AS R ON (E.num_reserva = R.num_reserva) JOIN (SELECT id_horario, hora_inicio, hora_termino FROM Horarios) AS H ON (R.id_horario = H.id_horario) WHERE E.num_reserva IN (R.num_reserva) ORDER BY num_reserva');
    res.json({ reservation, teams });
});
exports.deleteReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { num_reserva } = req.body;
    yield database_1.default.query('DELETE FROM Reserva WHERE num_reserva = ?', [num_reserva]);
    yield database_1.default.query('DELETE FROM Equipo WHERE num_reserva = ?', [num_reserva]);
    res.json({ message: 'Reserva anulada correctamente.' });
});
