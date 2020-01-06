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
const otherController = __importStar(require("../controllers/other.controller"));
const router = express_1.Router();
router.route('/')
    .get(otherController.getFields)
    .post(otherController.postFields);
exports.default = router;
