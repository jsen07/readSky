const router = require('express').Router();
const { User, Post, Comment } = require('../../models')

router.get('/', async (req, res) => {
    try {
        // res.render('createComment');
        const allComment = await Comment.findAll({
            include: [ User, Post ]
        })
        res.status(200).json(allComment);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            text: req.body.comment,
            likes: 0,
            user_id: req.session.user_id,
            post_id: req.body.post_id
            
        });
        res.status(200).json(newComment)
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
