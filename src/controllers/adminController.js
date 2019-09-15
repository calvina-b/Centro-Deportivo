const controller = {};

controller.getAdmin = (req, res) => {
    res.render('admin/admin');
};


module.exports = controller;