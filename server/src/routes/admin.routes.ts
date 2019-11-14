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