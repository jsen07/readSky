const router = require('express').Router();
const { User } = require('../../models');

// ROUTING FOR localhost/api/users/
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if(!userData) {
            res.status(400).json({ message: 'incorrect email or password.'});
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password.'});
            return;
        }
        req.session.save(() => {
            req.session.logged_in = true;
      
            res
              .status(200)
              .json({ user: userData, message: 'You are now logged in!' });
          });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }

    });

router.post('/logout', (req, res) => {
    if(req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
        else {
            res.status(404).end();
        }
});
// router.get('/login', async (req, res) => {
//     try {
//         const userData = await User.findAll();
//         const users = userData.map((user) => user.get({ plain: true }))
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

module.exports = router;
