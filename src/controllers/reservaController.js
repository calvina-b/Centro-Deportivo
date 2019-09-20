const controller = {};

controller.newReserv = async(req, res) => {
    // const reserva = await db.query('SELECT * FROM reserva');
    res.render('reserva/reserva');
};

module.exports = controller;