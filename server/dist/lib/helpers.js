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
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(10);
    const hash = yield bcrypt_1.default.hash(password, salt);
    return hash;
});
exports.matchPassword = (password, savedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bcrypt_1.default.compare(password, savedPassword);
    }
    catch (e) {
        console.log(e);
    }
});
// const bcrypt = require('bcrypt');
// const helpers = {};
// helpers.encryptPassword = async(password) => { //Se recibe password en texto plano
//     const salt = await bcrypt.genSalt(10); //Se genera un patron
//     const hash = await bcrypt.hash(password, salt); //Se pasa la contraseña y el patron a bcrypt para quer la cifre
//     return hash;
// };
// helpers.matchPassword = async(password, savedPassword) => {
//     try {
//         return await bcrypt.compare(password, savedPassword);
//     } catch (e) {
//         console.log(e);
//     }
// };
// module.exports = helpers;
