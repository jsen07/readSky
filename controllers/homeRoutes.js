const router = require('express').Router();
const { User, Post, Comment } = require('../models');
router.get("/", function (req, res) {
    req.flash('message', req.session.username);
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

router.get("/profile", (req, res) => {
    if(req.session.logged_in) {
        res.redirect(`profile/${req.session.user_id}`);
        return;
    }
    res.render('profile');
})
router.get('/profile/:id', async (req, res) => {
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
        res.render('userPosts', { userPosts });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

module.exports = router;