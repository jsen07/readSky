const User = require('./User.js'); // The code snippet imports the User model from the './User.js' file. This suggests that the User model is defined in a separate module is needed for performing database operations related to users in a Node.js application.

const Post = require('./Post.js'); // The code snippet imports the Post model from the './Post.js' file. This indicates that the Post model is defined in a separate module or file and is required for performing database operations related to posts in a Node.js application.

const Comment = require('./Comment.js') // The code snippet imports the Comment model from the './Comment.js' file. This suggests that the Comment model is defined in a separate module or file and is needed for performing database operations related to comments in a Node.js application.

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

//
module.exports = { User, Post, Comment } // The code snippet exports the User, Post, and Comment models as an object. This allows other parts of the application to import all three models from a single module.