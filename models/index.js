const User = require('./User.js');
const Post = require('./Post.js');

//Post belongs to a user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});
//User can have many posts
User.hasMany(Post);