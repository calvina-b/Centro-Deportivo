import bcrypt  from 'bcrypt';

export const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash; 
};

export const matchPassword = async (password: string, savedPassword: string) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e);
    }
};
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