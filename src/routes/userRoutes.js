const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

const userController = require('../controllers/userController');

router.get('/', isNotLoggedIn, userController.getLogin);
router.post('/', isNotLoggedIn, userController.postLogin);
router.get('/register', isNotLoggedIn, userController.getRegister);
router.post('/register', isNotLoggedIn, userController.postRegister);
router.get('/main', isLoggedIn, userController.main);
router.get('/logout', isLoggedIn, userController.logout);


module.exports = router;