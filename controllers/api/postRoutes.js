const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {   
                    model: Comment,
                    attributes: ['text', 'likes'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                
            ]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('posts', { posts });  // Pass 'posts' to the view
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/trending', async (req, res) => {
    try {
        const postData = await Post.findAll({
            order: [['likes', 'DESC']],
            limit: 5,
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['text', 'likes'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });
        const trendingPosts = postData.map((post) => post.get({ plain: true }));
        res.render('trending', { trendingPosts });
    } catch (error) {
        console.log(error);
    }
});

router.get('/create', (req, res) => {
    try {
        res.render('createPost');
    } catch (error) {
        console.log(error)
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
    const privateValue = req.body.private ? 1 : 0;
    try {
        const newPost = await Post.create({
            text: req.body.text,
            likes: 0,
            private: privateValue,
            user_id: req.session.user_id
        });
        res.redirect('/');
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