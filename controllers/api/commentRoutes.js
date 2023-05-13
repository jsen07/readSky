const router = require('express').Router();

router.get('/', (req, res) => {
    try {
        console.log('hi');
        res.render('createComment');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
