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
    .put(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, verifications.checkUpdateDuplicateNameOrEmailOrRutOrPhone, adminController.updateUsers);
// CANCHAS
router.route('/fields')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.getFields)
    .post(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, verifications.checkDuplicateFieldId, adminController.addFields);
router.route('/fields/:id')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.getOneField)
    .put(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, verifications.checkUpdateDuplicateFieldId, adminController.updateFields)
    .delete(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.deleteFields);
// Arbitros
router.route('/referees')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.getReferees)
    .post(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, verifications.checkDuplicateRefereeEmailOrRutOrPhone, adminController.addReferees);
router.route('/referees/:id')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.getOneReferee)
    .put(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, verifications.checkUpdateDuplicateRefereeEmailOrRutOrPhone, adminController.updateReferees)
    .delete(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.deleteReferees);
// Articulos
router.route('/items')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.getItems)
    .post(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, verifications.checkIfExistsFieldID, adminController.additems);
router.route('/items/:id')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, adminController.getOneItem)
    .put(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, verifications.checkIfExistsFieldID, adminController.updateItems)
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
