const express = require('express');
const router = express.Router();
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/auth');

const adminController = require('../controllers/adminController');

router.get('/admin', isAdmin, isLoggedIn, adminController.getAdmin);

module.exports = router;