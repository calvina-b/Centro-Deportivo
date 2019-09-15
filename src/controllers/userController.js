const passport = require('passport');

const controller = {};

controller.getLogin = (req, res) => {
    res.render('user/login');
};

controller.postLogin = (req, res, next) => {
    passport.authenticate('local.login', {
        successRedirect: '/main',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
};

controller.getRegister = (req, res) => {
    res.render('user/register');
};

controller.postRegister = passport.authenticate('local.register', {
    successRedirect: '/main',
    failureRedirect: '/register',
    failureFlash: true
});

controller.main = (req, res) => {
    res.render('user/main');
};

controller.logout = (req, res) => {
    req.logOut();
    res.redirect('/');
};
module.exports = controller;