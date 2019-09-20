const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');

const reservaController = require('../controllers/reservaController');

router.get('/reserva', isLoggedIn, reservaController.newReserv);


module.exports = router;

module.exports = router;