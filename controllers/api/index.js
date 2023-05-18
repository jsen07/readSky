const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const searchRoutes = require('./searchRoutes')
const profileRoutes = require('./profileRoutes');


router.use('/profile', profileRoutes);
router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/search', searchRoutes);
router.use('/comment', commentRoutes);
router.use('/users', userRoutes);

module.exports = router;