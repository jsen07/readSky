const router = require('express').Router();

router.get("/", function (req, res) {
    res.render('homepage', { logged_in: req.session.logged_in, message: req.flash('message') });

})

router.get("/login", (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
})

router.get("/register", (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('register');
})


module.exports = router;