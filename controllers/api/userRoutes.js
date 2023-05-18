const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// ROUTING FOR localhost/api/users/
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Post,
                    attributes: ['text', 'likes', 'private'],
                    include: [
                        {
                            model: Comment,
                            attributes: ['text', 'likes']
                        }
                    ]
                },
                
            ]
        });
        const userPosts = userData.get({ plain: true });
        const user_id = req.session.user_id;
        res.render('userPosts', { userPosts, user_id });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        
        req.flash('registerSuccess', 'You have successfully registered');
        res.redirect('/register');
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})
//wqewqe
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
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            req.session.username = userData.username;
            res.status(200).json({ user: userData, message: 'You are now logged in!' });
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
//wqeqe


module.exports = router;
