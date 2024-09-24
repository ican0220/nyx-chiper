//------------ Routing via Auth ------------//
module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {    //if user authenticated, go next action
            return next();
        }
        req.flash('error_msg', 'Please log in first!');
        res.redirect('/auth/login');    //else go to login
    },
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {   //if user not authenticated, go next action
            return next();
        }
        res.redirect('/home');     //else go to home
    }
};