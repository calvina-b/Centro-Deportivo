const controller = {};

const db = require('../database');


controller.getReserv = (req, res) => {
    res.render('reserva/reserva', {title: "Reservar"});
};

controller.postReserv = (req, res) => {
    req.session.data = req.body;
    res.redirect('/reserva/horarios');
};

controller.getHorario = async (req, res) => {
    const { deporte, fecha } = req.session.data;
    const horario = await db.query('SELECT C.id, C.deporte, C.precio_base, H.id_horario, H.hora_inicio, H.hora_termino from cancha AS C, horarios AS H WHERE deporte = ?', [deporte]);
    res.render('reserva/horarios', {title: "Horarios", horario, fecha });
};

controller.postHorario = async (req, res) => {
    const rut = req.user.rut;
    const id = req.body[0];
    const deporte = req.body[1];
    const precio = req.body[2];
    const fecha = req.body[3];
    const horario = req.body[4];
    // await db.query('INSERT INTO reserva (fecha, valor_arriendo, rut_cliente, id_cancha, deporte_cancha, id_horario) VALUES ?', [fecha, precio, rut, id, deporte, horario]);
    console.log(req.body)
};

module.exports = controller;