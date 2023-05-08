const router = require('express').Router();

// router.get("/login", (req, res))
router.get("/", function (req, res) {
    res.render('homepage');

})
module.exports = router;