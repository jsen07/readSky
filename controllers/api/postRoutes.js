const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {   model: Comment,
                    attributes: ['text', 'likes']
                }
            ]
        });
        const posts = postData.map((post) => post.get({ plain: true }))
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
                include: [
                    {
                        model: Comment,
                        attributes: [ 'text', 'likes' ]
                    }

                ]
            });
        res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            text: req.body.text,
            likes: 0,
            private: req.body.private,
            user_id: req.body.user_id
        });
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const postUpdate = await Post.update(
            {
                text: req.body.text,
                likes: req.body.likes,
                private: req.body.private
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.status(200).json(postUpdate);
    } catch (error) {
        res.status(200).json(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json('successfully deleted post');
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;