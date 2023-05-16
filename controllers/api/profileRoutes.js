const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


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
        res.render('profile', { userPosts, logged_in: req.session.logged_in });

    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

router.put('/edit', async (req, res) => {
    try {
        const userUpdate = await User.update(
            {
                first_name: req.body.first_name,
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.status(200).json(userUpdate);
    } catch (error) {
        res.status(200).json(error);
    }
});


module.exports = router;
