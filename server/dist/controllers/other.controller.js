"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
exports.getFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sports = yield database_1.default.query('SELECT DISTINCT deporte FROM cancha');
    res.json(sports);
});
exports.postFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deporte } = req.body;
    const fieldInfo = yield database_1.default.query('SELECT deporte, COUNT(deporte) AS cantidad_canchas, precio_base*1.00 AS dia_normal,(precio_base*1.20) AS dia_concurrido, precio_base*1.15 AS dia_normal_pm, precio_base*1.35 AS dia_concurrido_pm FROM Cancha WHERE deporte = ? GROUP BY deporte', [deporte]);
    res.json(fieldInfo);
});
