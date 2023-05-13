const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const searchRoutes = require('./searchRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/search', searchRoutes);
router.use('/post/comment', commentRoutes);

module.exports = router;
