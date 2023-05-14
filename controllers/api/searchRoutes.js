const router = require('express').Router();
const { Op } = require('sequelize');
const { User, Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
    const searchQuery = req.body.search;
    
    try {
      const searchResults = await Post.findAll({
        attributes: ['text', 'likes'],
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
            attributes: ['text', 'likes'],
            include: {
              model: User,
              attributes: ['username'],
            },
          },
        ],
        where: {
          [Op.or]: [
            {
              text: {
                [Op.like]: `%${searchQuery}%`,
              },
            },
            {
              '$User.username$': {
                [Op.like]: `%${searchQuery}%`,
              },
            },
          ],
        },
      });
      res.render('searchResults', { searchResults });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while performing the search' });
    }
});

module.exports = router;