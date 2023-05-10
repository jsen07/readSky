const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})
// router.get('/', async (req, res) => {
//     try {
//         const userData = await User.findAll();
//         const users = userData.map((user) => user.get({ plain: true }))
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

module.exports = router;
