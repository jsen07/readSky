const User = require('./User.js');
const Post = require('./Post.js');
const Comment = require('./Comment.js')

//User can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

//Post belongs to a user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

// Comment belongs to a post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// User can have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Comment belongs to a user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});


module.exports = { User, Post, Comment }