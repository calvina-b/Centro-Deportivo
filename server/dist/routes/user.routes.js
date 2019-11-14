"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const verifyToken_1 = require("../lib/verifyToken");
const verifications_1 = require("../lib/verifications");
const router = express_1.Router();
router.route('/')
    .post(user_controller_1.signin);
router.route('/register')
    .post(verifications_1.checkDuplicateNameOrEmailOrRutOrPhone, user_controller_1.signup);
router.route('/profile')
    .get(verifyToken_1.tokenValidation, verifyToken_1.isAdmin, user_controller_1.profile);
exports.default = router;
