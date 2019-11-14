"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reservation_controller_1 = require("../controllers/reservation.controller");
const router = express_1.Router();
router.route('/')
    .post(reservation_controller_1.reservation);
exports.default = router;
