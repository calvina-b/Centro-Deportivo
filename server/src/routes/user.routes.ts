import { Router } from 'express';
import { signin, signup, profile } from '../controllers/user.controller'
import { tokenValidation, isAdmin } from '../lib/verifyToken';
import { checkDuplicateNameOrEmailOrRutOrPhone } from '../lib/verifications';

const router = Router();

router.route('/')
    .post(signin);
router.route('/register')
    .post(checkDuplicateNameOrEmailOrRutOrPhone, signup);
router.route('/profile')
    .get(tokenValidation, isAdmin, profile);
    
export default router;

// const express = require('express');
// const router = express.Router();
// const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

// const userController = require('../controllers/userController');

// router.get('/', isNotLoggedIn, userController.getLogin);
// router.post('/', isNotLoggedIn, userController.postLogin);
// router.get('/register', isNotLoggedIn, userController.getRegister);
// router.post('/register', isNotLoggedIn, userController.postRegister);
// router.get('/main', isLoggedIn, userController.main);
// router.get('/logout', isLoggedIn, userController.logout);


// module.exports = router;