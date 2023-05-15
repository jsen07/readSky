const { Model, DataTypes } = require('sequelize'); // The code snippet imports the Model and DataTypes objects from the sequelize library. These objects are essential for defining and working with database models in a Sequelize-based application.

const sequelize = require('../config/connection.js'); // The code snippet imports the sequelize object from the '../config/connection.js' file. This suggests that it establishes a connection to a database using Sequelize in a Node.js application.

class Post extends Model {} // The code snippet defines a Post class that extends the Model class. This indicates that the Post class is a model class used for interacting with a specific data table or entity in a database.

// The code snippet initializes the Post model. This suggests that it sets up the necessary configurations and attributes for the Post model, allowing it to be used for database operations such as creating, retrieving, updating, and deleting post records.
Post.init( 
    {
        // The code snippet defines an id attribute for the Post model. This id attribute is of type INTEGER and serves as the primary key for the Post model
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
          }, 
        private: {
            type: DataTypes.BOOLEAN
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        }
    },
    {
        sequelize, // sequelize indicates the Sequelize instance that is used for this model.
        timestamps: false, // timestamps: false suggests that the Post model does not include automatic timestamp fields like createdAt and updatedAt.
        freezeTableName: true, // freezeTableName: true indicates that the table name for the Post model should be the same as the model name, preventing Sequelize from automatically pluralizing the table name.
        underscored: true, // underscored: true specifies that the column names in the Post model should use underscored naming convention (e.g., created_at instead of createdAt).
        modelName: 'post' // modelName: 'post' sets the model name to 'post', which will be used by Sequelize for various operations.
    }
);
// The code snippet exports the Post model, making it available for other parts of the application to use.
module.exports = Post;