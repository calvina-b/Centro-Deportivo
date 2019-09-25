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
    const horario = await db.query('SELECT C.id, C.deporte, C.precio_base, H.hora_inicio, H.hora_termino from cancha AS C, horarios AS H WHERE deporte = ?', [deporte]);
    res.render('reserva/horarios', {title: "Horarios", horario, fecha });
};

controller.postHorario = (req, res) => {
};

module.exports = controller;