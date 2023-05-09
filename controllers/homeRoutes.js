const router = require('express').Router();

router.get("/", function (req, res) {
    res.render('homepage');

})

router.get("/login", (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
})
module.exports = router;