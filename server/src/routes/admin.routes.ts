import { Router } from 'express';
import * as adminController from '../controllers/admin.controller'
import { tokenValidation, isAdmin } from '../lib/verifyToken';
import * as verifications from '../lib/verifications';

const router = Router();

router.route('/')
    .get(tokenValidation, isAdmin, adminController.getAdmin)

// USUARIOS
router.route('/users')
    .get(tokenValidation, isAdmin, adminController.getUsers)
router.route('/users/:id')
    .get(tokenValidation, isAdmin, adminController.getOneUser)
    .delete(tokenValidation, isAdmin, adminController.deleteUsers)
    .put(tokenValidation, isAdmin, adminController.updateUsers)

// CANCHAS
router.route('/fields')
    .get(tokenValidation, isAdmin, adminController.getFields)
    .post(tokenValidation, isAdmin, verifications.checkDuplicateFieldId, adminController.addFields)
router.route('/fields/:id')
    .get(tokenValidation, isAdmin, adminController.getOneField)
    .put(tokenValidation, isAdmin, adminController.updateFields)
    .delete(tokenValidation, isAdmin, adminController.deleteFields)

// Arbitros
router.route('/referees')
    .get(tokenValidation, isAdmin, adminController.getReferees)
    .post(tokenValidation, isAdmin, adminController.addReferees)
router.route('/referees/:id')
    .get(tokenValidation, isAdmin, adminController.getOneReferee)
    .put(tokenValidation, isAdmin, adminController.updateReferees)
    .delete(tokenValidation, isAdmin, adminController.deleteReferees)
    
// Articulos
router.route('/items')
    .get(tokenValidation, isAdmin, adminController.getItems)
    .post(tokenValidation, isAdmin, adminController.additems)
router.route('/items/:id')
    .get(tokenValidation, isAdmin, adminController.getOneItem)
    .put(tokenValidation, isAdmin, adminController.updateItems)
    .delete(tokenValidation, isAdmin, adminController.deleteItems) 

// Horarios
router.route('/scheds')
    .get(tokenValidation, isAdmin, adminController.getScheds)
    .post(tokenValidation, isAdmin, adminController.addScheds)
router.route('/scheds/:id')
    .get(tokenValidation, isAdmin, adminController.getOneSched)
    .put(tokenValidation, isAdmin, adminController.updateScheds)
    .delete(tokenValidation, isAdmin, adminController.deleteScheds) 
    
export default router;

// const express = require('express');
// const router = express.Router();
// const { isLoggedIn, isAdmin } = require('../lib/auth');

// const adminController = require('../controllers/adminController');

// router.get('/admin', isAdmin, isLoggedIn, adminController.getAdmin);

// // USUARIOS
// router.get('/admin/users', isAdmin, isLoggedIn, adminController.getUsers);
// router.get('/admin/users/delete/:id', isAdmin, isLoggedIn, adminController.deleteUsers);
// router.get('/admin/users/update/:id', isAdmin, isLoggedIn, adminController.getUpdateUsers);
// router.post('/admin/users/update/:id', isAdmin, isLoggedIn, adminController.postUpdateUsers);

// // ARBITROS
// router.get('/admin/referees', isAdmin, isLoggedIn, adminController.getReferee);
// router.get('/admin/referees/delete/:id', isAdmin, isLoggedIn, adminController.deleteReferee);
// router.get('/admin/referees/add', isAdmin, isLoggedIn, adminController.getAddReferee);
// router.post('/admin/referees/add', isAdmin, isLoggedIn, adminController.postAddReferee);
// router.get('/admin/referees/update/:id', isAdmin, isLoggedIn, adminController.getUpdateReferee);
// router.post('/admin/referees/update/:id', isAdmin, isLoggedIn, adminController.postUpdateReferee);

// // CANCHAS
// router.get('/admin/fields', isAdmin, isLoggedIn, adminController.getFields);
// router.get('/admin/fields/delete/:id', isAdmin, isLoggedIn, adminController.deleteFields);
// router.get('/admin/fields/add', isAdmin, isLoggedIn, adminController.getAddFields);
// router.post('/admin/fields/add', isAdmin, isLoggedIn, adminController.postAddFields);
// router.get('/admin/fields/update/:id', isAdmin, isLoggedIn, adminController.getUpdateFields);
// router.post('/admin/fields/update/:id', isAdmin, isLoggedIn, adminController.postUpdateFields);

// // ARTICULOS
// router.get('/admin/items', isAdmin, isLoggedIn, adminController.getItems);
// router.get('/admin/items/delete/:id', isAdmin, isLoggedIn, adminController.deleteItems);
// router.get('/admin/items/add', isAdmin, isLoggedIn, adminController.getAddItems);
// router.post('/admin/items/add', isAdmin, isLoggedIn, adminController.postAddItems);
// router.get('/admin/items/update/:id', isAdmin, isLoggedIn, adminController.getUpdateItems);
// router.post('/admin/items/update/:id', isAdmin, isLoggedIn, adminController.postUpdateItems);

// // HORARIOS
// router.get('/admin/sched', isAdmin, isLoggedIn, adminController.getSched);
// router.get('/admin/sched/delete/:id', isAdmin, isLoggedIn, adminController.deleteSched);
// router.get('/admin/sched/add', isAdmin, isLoggedIn, adminController.getAddSched);
// router.post('/admin/sched/add', isAdmin, isLoggedIn, adminController.postAddSched);
// router.get('/admin/sched/update/:id', isAdmin, isLoggedIn, adminController.getUpdateSched);
// router.post('/admin/sched/update/:id', isAdmin, isLoggedIn, adminController.postUpdateSched);

// module.exports = router;