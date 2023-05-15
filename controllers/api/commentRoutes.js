const router = require('express').Router();
const { User, Post, Comment } = require('../../models')

router.get('/', (req, res) => {
    try {
        res.render('createComment');
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const newComment = await Post.create({
            text: req.body.text,
            likes: 0,
            user_id: req.session.user_id,
            post_id: req.params.id
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
