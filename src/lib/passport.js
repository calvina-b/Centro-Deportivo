const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../database');
const helpers = require('../lib/helpers');

DEFAULT = 'Cliente';
passport.use('local.register', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, correo, password, done) => {
    const { nombre, nombre_usuario, direccion, rut, dV, telefono } = req.body;
    const newUser = {
        correo,
        password,
        nombre,
        nombre_usuario,
        direccion,
        rut,
        dV,
        telefono,
        tipo_cuenta: DEFAULT
    }
    newUser.password = await helpers.encryptPassword(password);
    const result = await db.query('INSERT INTO usuario SET ?', [newUser]);
    newUser.id_usuario = result.insertId;
    console.log(result);
    return done(null, newUser);
}));

passport.use('local.login', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, correo, password, done) => {
    console.log(req.body)
    const rows = await db.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPass = await helpers.matchPassword(password, user.password);
        if (validPass) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.nombre_usuario + '!'));
        } else {
            done(null, false, req.flash('error', 'Contraseña incorrecta'))
        }
    } else {
        return done(null, false, req.flash('error', 'El correo no existe'));
    }

}));

passport.serializeUser((user, done) => {
    done(null, user.id_usuario)
});

passport.deserializeUser(async(id_usuario, done) => {
    const rows = await db.query('SELECT * FROM usuario WHERE id_usuario = ?', [id_usuario]);
    done(null, rows[0]);
});