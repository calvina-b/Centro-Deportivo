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
    res.json({ usersCount: usersCount.length, reservCount: reservCount.length, refereeCount: refereeCount.length, fieldsCount: fieldsCount.length, itemsCount: itemsCount.length, schedCount: schedCount.length });
});
// ··········USUARIOS··········
exports.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield database_1.default.query('SELECT * FROM usuario');
    res.json(users);
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
    const referees = yield database_1.default.query('SELECT R.id_arbitro, R.nombre, R.rut, R.correo, C.deporte, R.nro_contacto, (C.precio_base*0.4) AS cobro_por_servicio FROM Referee AS R JOIN (Cancha AS C) ON (R.deporte = C.deporte) GROUP BY R.id_arbitro');
    res.json(referees);
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
