const controller = {};
const db = require('../database');

controller.getAdmin = async(req, res) => {
    const usersCount = await db.query('SELECT * FROM usuario');
    const reservCount = await db.query('SELECT * FROM reserva');
    const refereeCount = await db.query('SELECT * FROM referee');
    const fieldsCount = await db.query('SELECT * FROM cancha');
    const itemsCount = await db.query('SELECT * FROM cancha');
    const schedCount = await db.query('SELECT * FROM cancha');
    res.render('admin/admin', { title: "Administracion", usersCount, reservCount, refereeCount, fieldsCount, itemsCount, schedCount });
};

// ··········USUARIOS··········
controller.getUsers = async(req, res) => {
    const users = await db.query('SELECT * FROM usuario');
    res.render('admin/users', { title: "Usuarios", users });
};

controller.deleteUsers = async(req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM usuario WHERE id_usuario = ?', [id]);
    req.flash('success', 'Usuario eliminado correctamente');
    res.redirect('/admin/users');
};

controller.getUpdateUsers = async(req, res) => {
    const { id } = req.params;
    const users = await db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
    res.render('admin/usersUpdate', { title: "Editar usuario", users: users[0] });
};

controller.postUpdateUsers = async(req, res) => {
    const { id } = req.params;
    await db.query('UPDATE usuario SET ? WHERE id_usuario = ?', [req.body, id]);
    req.flash('success', 'Usuario actualizado correctamente');
    res.redirect('/admin/users');
};

// ··········CANCHAS··········
controller.getFields = async(req, res) => {
    const fields = await db.query('SELECT * FROM cancha');
    res.render('admin/fields', { title: "Canchas", fields });
};

controller.deleteFields = async(req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM cancha WHERE id = ?', [id]);
    req.flash('success', 'Cancha eliminada correctamente');
    res.redirect('/admin/fields');
};

controller.getAddFields = async(req, res) => {
    res.render('admin/fieldsAdd', { title: "Añadir cancha" });
};

controller.postAddFields = async(req, res) => {
    await db.query('INSERT INTO cancha SET ?', [req.body]);
    req.flash('success', 'Cancha agregada correctamente');
    res.redirect('/admin/fields');
};

controller.getUpdateFields = async(req, res) => {
    const { id } = req.params;
    const fields = await db.query('SELECT * FROM cancha WHERE id = ?', [id]);
    res.render('admin/fieldsUpdate', { title: "Editar Cancha", fields: fields[0] });
};

controller.postUpdateFields = async(req, res) => {
    const { id } = req.params;
    await db.query('UPDATE cancha SET ? WHERE id = ?', [req.body, id]);
    req.flash('success', 'Cancha actualizada correctamente');
    res.redirect('/admin/fields');
};

// ··········ARBITROS··········
controller.getReferee = async(req, res) => {
    const referee = await db.query('SELECT * FROM referee');
    res.render('admin/referee', { title: "Arbitros", referee });
};

controller.deleteReferee = async(req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM cancha WHERE id_arbitro = ?', [id]);
    req.flash('success', 'Arbitro eliminado correctamente');
    res.redirect('/admin/referees');
};

controller.getAddReferee = async(req, res) => {
    res.render('admin/refereeAdd', { title: "Añadir arbitros"});
};

controller.postAddReferee = async(req, res) => {
    await db.query('INSERT INTO referee SET ?', [req.body]);
    req.flash('success', 'Arbitro agregado correctamente');
    res.redirect('/admin/referees');
};

controller.getUpdateReferee = async(req, res) => {
    const { id } = req.params;
    const referees = await db.query('SELECT * FROM referee WHERE id_arbitro = ?', [id]);
    res.render('admin/refereeUpdate', { title: "Editar arbitro", referees: referees[0] });
};

controller.postUpdateReferee = async(req, res) => {
    const { id } = req.params;
    await db.query('UPDATE referee SET ? WHERE id_arbitro = ?', [req.body, id]);
    req.flash('success', 'Arbitro actualizado correctamente');
    res.redirect('/admin/referees');
};

// ··········ARTICULOS··········
controller.getItems = async(req, res) => {
    const items = await db.query('SELECT * FROM articulo');
    res.render('admin/items', { title: "Articulos", items });
};

controller.deleteItems = async(req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM articulo WHERE cod = ?', [id]);
    req.flash('success', 'Articulo eliminado correctamente');
    res.redirect('/admin/items');
};

controller.getAddItems = async(req, res) => {
    res.render('admin/itemsAdd', { title:"Añadir articulo" });
};

controller.postAddItems = async(req, res) => {
    await db.query('INSERT INTO articulo SET ?', [req.body]);
    req.flash('success', 'Articulo agregado correctamente');
    res.redirect('/admin/items');
};

controller.getUpdateItems = async(req, res) => {
    const { id } = req.params;
    const items = await db.query('SELECT * FROM articulo WHERE cod = ?', [id]);
    res.render('admin/itemsUpdate', { title:"Editar articulo", items: items[0] });
};

controller.postUpdateItems = async(req, res) => {
    const { id } = req.params;
    await db.query('UPDATE articulo SET ? WHERE cod = ?', [req.body, id]);
    req.flash('success', 'Articulo actualizado correctamente');
    res.redirect('/admin/items');
};

// ··········HORARIOS··········
controller.getSched = async(req, res) => {
    const sched = await db.query('SELECT * FROM horarios');
    res.render('admin/sched', { title:"Horarios", sched });
};

controller.deleteSched = async(req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM horarios WHERE id_horario = ?', [id]);
    req.flash('success', 'Horario eliminado correctamente');
    res.redirect('/admin/sched');
};

controller.getAddSched = async(req, res) => {
    res.render('admin/schedAdd', { title:"Añadir horario" });
};

controller.postAddSched = async(req, res) => {
    await db.query('INSERT INTO horarios SET ?', [req.body]);
    req.flash('success', 'Horario agregado correctamente');
    res.redirect('/admin/sched');
};

controller.getUpdateSched = async(req, res) => {
    const { id } = req.params;
    const scheds = await db.query('SELECT * FROM horarios WHERE id_horario = ?', [id]);
    res.render('admin/schedUpdate', { title:"Editar horario", scheds: scheds[0] });
};

controller.postUpdateSched = async(req, res) => {
    const { id } = req.params;
    await db.query('UPDATE horarios SET ? WHERE id_horario = ?', [req.body, id]);
    req.flash('success', 'Horario actualizado correctamente');
    res.redirect('/admin/sched');
};
module.exports = controller;