"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController = __importStar(require("../controllers/admin.controller"));
const verifyToken_1 = require("../lib/verifyToken");
const verifications = __importStar(require("../lib/verifications"));
const router = express_1.Router();
router.route('/')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.getAdmin);
// USUARIOS
router.route('/users')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.getUsers);
router.route('/users/:id')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.getOneUser)
    .delete(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.deleteUsers)
    .put(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.updateUsers);
// CANCHAS
router.route('/fields')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.getFields)
    .post(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, verifications.checkDuplicateFieldId, adminController.addFields);
router.route('/fields/:id')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.getOneField)
    .put(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.updateFields)
    .delete(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.deleteFields);
// Arbitros
router.route('/referees')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.getReferees)
    .post(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.addReferees);
router.route('/referees/:id')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.getOneReferee)
    .put(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.updateReferees)
    .delete(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.deleteReferees);
// Articulos
router.route('/items')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.getItems)
    .post(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.additems);
router.route('/items/:id')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.getOneItem)
    .put(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.updateItems)
    .delete(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.deleteItems);
// Horarios
router.route('/scheds')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.getScheds)
    .post(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.addScheds);
router.route('/scheds/:id')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.getOneSched)
    .put(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.updateScheds)
    .delete(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.deleteScheds);
exports.default = router;
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
