const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const searchRoutes = require('./searchRoutes');
const commentRoutes = require('./commentRoutes');


router.use('/post', postRoutes);
router.use('/search', searchRoutes);
router.use('/comment', commentRoutes);
router.use('/users', userRoutes);

module.exports = router;
