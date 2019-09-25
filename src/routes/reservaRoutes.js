const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');

const reservaController = require('../controllers/reservaController');

router.get('/reserva', isLoggedIn, reservaController.getReserv);
router.post('/reserva', isLoggedIn, reservaController.postReserv);
router.get('/reserva/horarios', isLoggedIn, reservaController.getHorario);
router.post('/reserva/horarios', isLoggedIn, reservaController.postHorario);


module.exports = router;