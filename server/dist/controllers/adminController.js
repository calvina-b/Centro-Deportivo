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
    const referees = yield database_1.default.query('SELECT * FROM referee');
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
    const { id } = req.params;
    const item = yield database_1.default.query('SELECT * FROM articulo WHERE cod = ?', [id]);
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
    const { id } = req.params;
    yield database_1.default.query('DELETE FROM articulo WHERE cod = ?', [id]);
    res.json({ message: 'Articulo eliminado' });
});
exports.updateItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield database_1.default.query('UPDATE articulo SET ? WHERE cod = ?', [req.body, id]);
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
// const controller = {};
// const db = require('../database');
// controller.getAdmin = async(req, res) => {
//     const usersCount = await db.query('SELECT * FROM usuario');
//     const reservCount = await db.query('SELECT * FROM reserva');
//     const refereeCount = await db.query('SELECT * FROM referee');
//     const fieldsCount = await db.query('SELECT * FROM cancha');
//     const itemsCount = await db.query('SELECT * FROM cancha');
//     const schedCount = await db.query('SELECT * FROM cancha');
//     res.render('admin/admin', { title: "Administracion", usersCount, reservCount, refereeCount, fieldsCount, itemsCount, schedCount });
// };
// // ··········USUARIOS··········
// controller.getUsers = async(req, res) => {
//     const users = await db.query('SELECT * FROM usuario');
//     res.render('admin/users', { title: "Usuarios", users });
// };
// controller.deleteUsers = async(req, res) => {
//     const { id } = req.params;
//     await db.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
//     req.flash('success', 'Usuario eliminado correctamente');
//     res.redirect('/admin/users');
// };
// controller.getUpdateUsers = async(req, res) => {
//     const { id } = req.params;
//     const users = await db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
//     res.render('admin/usersUpdate', { title: "Editar usuario", users: users[0] });
// };
// controller.postUpdateUsers = async(req, res) => {
//     const { id } = req.params;
//     await db.query('UPDATE usuario SET ? WHERE id_usuario = ?', [req.body, id]);
//     req.flash('success', 'Usuario actualizado correctamente');
//     res.redirect('/admin/users');
// };
// // ··········CANCHAS··········
// controller.getFields = async(req, res) => {
//     const fields = await db.query('SELECT * FROM cancha');
//     res.render('admin/fields', { title: "Canchas", fields });
// };
// controller.deleteFields = async(req, res) => {
//     const { id } = req.params;
//     await db.query('DELETE FROM cancha WHERE id = ?', [id]);
//     req.flash('success', 'Cancha eliminada correctamente');
//     res.redirect('/admin/fields');
// };
// controller.getAddFields = async(req, res) => {
//     res.render('admin/fieldsAdd', { title: "Añadir cancha" });
// };
// controller.postAddFields = async(req, res) => {
//     await db.query('INSERT INTO cancha SET ?', [req.body]);
//     req.flash('success', 'Cancha agregada correctamente');
//     res.redirect('/admin/fields');
// };
// controller.getUpdateFields = async(req, res) => {
//     const { id } = req.params;
//     const fields = await db.query('SELECT * FROM cancha WHERE id = ?', [id]);
//     res.render('admin/fieldsUpdate', { title: "Editar Cancha", fields: fields[0] });
// };
// controller.postUpdateFields = async(req, res) => {
//     const { id } = req.params;
//     await db.query('UPDATE cancha SET ? WHERE id = ?', [req.body, id]);
//     req.flash('success', 'Cancha actualizada correctamente');
//     res.redirect('/admin/fields');
// };
// // ··········ARBITROS··········
// controller.getReferee = async(req, res) => {
//     const referee = await db.query('SELECT * FROM referee');
//     res.render('admin/referee', { title: "Arbitros", referee });
// };
// controller.deleteReferee = async(req, res) => {
//     const { id } = req.params;
//     await db.query('DELETE FROM cancha WHERE id_arbitro = ?', [id]);
//     req.flash('success', 'Arbitro eliminado correctamente');
//     res.redirect('/admin/referees');
// };
// controller.getAddReferee = async(req, res) => {
//     res.render('admin/refereeAdd', { title: "Añadir arbitros"});
// };
// controller.postAddReferee = async(req, res) => {
//     await db.query('INSERT INTO referee SET ?', [req.body]);
//     req.flash('success', 'Arbitro agregado correctamente');
//     res.redirect('/admin/referees');
// };
// controller.getUpdateReferee = async(req, res) => {
//     const { id } = req.params;
//     const referees = await db.query('SELECT * FROM referee WHERE id_arbitro = ?', [id]);
//     res.render('admin/refereeUpdate', { title: "Editar arbitro", referees: referees[0] });
// };
// controller.postUpdateReferee = async(req, res) => {
//     const { id } = req.params;
//     await db.query('UPDATE referee SET ? WHERE id_arbitro = ?', [req.body, id]);
//     req.flash('success', 'Arbitro actualizado correctamente');
//     res.redirect('/admin/referees');
// };
// // ··········ARTICULOS··········
// controller.getItems = async(req, res) => {
//     const items = await db.query('SELECT * FROM articulo');
//     res.render('admin/items', { title: "Articulos", items });
// };
// controller.deleteItems = async(req, res) => {
//     const { id } = req.params;
//     await db.query('DELETE FROM articulo WHERE cod = ?', [id]);
//     req.flash('success', 'Articulo eliminado correctamente');
//     res.redirect('/admin/items');
// };
// controller.getAddItems = async(req, res) => {
//     res.render('admin/itemsAdd', { title:"Añadir articulo" });
// };
// controller.postAddItems = async(req, res) => {
//     await db.query('INSERT INTO articulo SET ?', [req.body]);
//     req.flash('success', 'Articulo agregado correctamente');
//     res.redirect('/admin/items');
// };
// controller.getUpdateItems = async(req, res) => {
//     const { id } = req.params;
//     const items = await db.query('SELECT * FROM articulo WHERE cod = ?', [id]);
//     res.render('admin/itemsUpdate', { title:"Editar articulo", items: items[0] });
// };
// controller.postUpdateItems = async(req, res) => {
//     const { id } = req.params;
//     await db.query('UPDATE articulo SET ? WHERE cod = ?', [req.body, id]);
//     req.flash('success', 'Articulo actualizado correctamente');
//     res.redirect('/admin/items');
// };
// // ··········HORARIOS··········
// controller.getSched = async(req, res) => {
//     const sched = await db.query('SELECT * FROM horarios');
//     res.render('admin/sched', { title:"Horarios", sched });
// };
// controller.deleteSched = async(req, res) => {
//     const { id } = req.params;
//     await db.query('DELETE FROM horarios WHERE id_horario = ?', [id]);
//     req.flash('success', 'Horario eliminado correctamente');
//     res.redirect('/admin/sched');
// };
// controller.getAddSched = async(req, res) => {
//     res.render('admin/schedAdd', { title:"Añadir horario" });
// };
// controller.postAddSched = async(req, res) => {
//     await db.query('INSERT INTO horarios SET ?', [req.body]);
//     req.flash('success', 'Horario agregado correctamente');
//     res.redirect('/admin/sched');
// };
// controller.getUpdateSched = async(req, res) => {
//     const { id } = req.params;
//     const scheds = await db.query('SELECT * FROM horarios WHERE id_horario = ?', [id]);
//     res.render('admin/schedUpdate', { title:"Editar horario", scheds: scheds[0] });
// };
// controller.postUpdateSched = async(req, res) => {
//     const { id } = req.params;
//     await db.query('UPDATE horarios SET ? WHERE id_horario = ?', [req.body, id]);
//     req.flash('success', 'Horario actualizado correctamente');
//     res.redirect('/admin/sched');
// };
// module.exports = controller;
