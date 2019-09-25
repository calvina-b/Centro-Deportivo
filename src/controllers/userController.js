const passport = require('passport');

const controller = {};

controller.getLogin = async(req, res) => {
    res.render('user/login', {title: "Login" });
};

controller.postLogin = (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/main',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
};

controller.getRegister = (req, res) => {
    res.render('user/register', {title: "Registro" });
};

controller.postRegister = passport.authenticate('local.register', {
    successRedirect: '/main',
    failureRedirect: '/register',
    failureFlash: true
});

controller.main = (req, res) => {
    res.render('user/main', {title: "Inicio" });
};

controller.logout = (req, res) => {
    req.logOut();
    res.redirect('/');
};
module.exports = controller;