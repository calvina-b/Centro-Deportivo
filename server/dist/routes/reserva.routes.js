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
const reservationController = __importStar(require("../controllers/reservation.controller"));
const verifyToken_1 = require("../lib/verifyToken");
const router = express_1.Router();
router.route('/')
    .post(verifyToken_1.tokenValidation, reservationController.reservation);
router.route('/new')
    .post(reservationController.newReservation);
exports.default = router;
