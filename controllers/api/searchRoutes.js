const router = require('express').Router();
const { Op } = require('sequelize');
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

    const trendingPostData = await Post.findAll({
      order: [['likes', 'DESC']],
      limit: 5,
      include: [
        {
          model: User,
          attributes: ['id', 'username']
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
    const trendingPosts = trendingPostData.map((post) => post.get({ plain: true }));
    const user_id = req.session.user_id;
    req.flash('message', req.session.username);
  // res.render('homepage', { logged_in: req.session.logged_in, message: req.flash('message') });
    res.render('searchPage', { posts, user_id, trendingPosts, logged_in: req.session.logged_in, message: req.flash('message') });
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.post('/', async (req, res) => {
//     const searchQuery = req.body.search;
    
//     try {
//       const searchResults = await Post.findAll({
//         attributes: ['text', 'likes'],
//         include: [
//           {
//             model: User,
//             attributes: ['username'],
//           },
//           {
//             model: Comment,
//             attributes: ['text', 'likes'],
//             include: {
//               model: User,
//               attributes: ['username'],
//             },
//           },
//         ],
//         where: {
//           [Op.or]: [
//             {
//               text: {
//                 [Op.like]: `%${searchQuery}%`,
//               },
//             },
//             {
//               '$User.username$': {
//                 [Op.like]: `%${searchQuery}%`,
//               },
//             },
//           ],
//         },
//       });
//       res.render('searchPage', { searchResults });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: 'An error occurred while performing the search' });
//     }
// });

// const { Op } = require('sequelize');

router.post('/', async (req, res) => {
  const searchQuery = req.body.search;

  try {
    const postSearches = await Post.findAll({
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
        text: {
          [Op.like]: `%${searchQuery}%`,
        },
      },
    });

    const userSearches = await User.findAll({
      attributes: ['username', 'id'],
      where: {
        username: {
          [Op.like]: `%${searchQuery}%`,
        },
      },
    });

    res.render('searchPage', { postSearches, userSearches });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while performing the search' });
  }
});


module.exports = router;