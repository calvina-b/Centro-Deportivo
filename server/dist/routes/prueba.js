"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prueba_1 = require("../controllers/prueba");
const router = express_1.Router();
router.route('/')
    .get(prueba_1.holi);
exports.default = router;
