module.exports = {

    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/main')
    },

    isAdmin(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.tipo_cuenta == 'Admin') {
                return next();
            }
        }
        return res.redirect('/main');
    }

}