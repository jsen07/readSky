// The code snippet imports the necessary modules from the 'sequelize' library for working with database models in Node.js.
const { Model, DataTypes } = require('sequelize');
// The code snippet requires the 'sequelize' module from the '../config/connection.js' file, indicating the establishment of a connection to a database using Sequelize in a Node.js application.
const sequelize = require('../config/connection.js');
// The code snippet defines a Comment class that extends the Model class. This suggests that the Comment class is a model class used for interacting with a specific data table or entity in a database.
class Comment extends Model {}

Comment.init(
    {
        // The code snippet defines an id attribute for the Comment model. This id attribute is of type INTEGER and serves as the primary key for the Comment model. It is configured to auto-increment, meaning that its value will automatically increase for each new record inserted into the database.
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
          }, 
          user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id',
            }
        }
    },
    {
        // This code snippet provides configuration options for the Comment model.
        sequelize, //sequelize indicates the Sequelize instance that is used for this model. 
        timestamps: false, //timestamps: false suggests that the Comment model does not include automatic timestamp fields like createdAt and updatedAt.
        freezeTableName: true, // freezeTableName: true indicates that the table name for the Comment model should be the same as the model name, preventing Sequelize from automatically pluralizing the table name.
        underscored: true, // underscored: true specifies that the column names in the Comment model should use underscored naming convention (e.g., created_at instead of createdAt).
        modelName: 'comment' // modelName: 'comment' sets the model name to 'comment', which will be used by Sequelize for various operations.
    }
);
// The code snippet exports the Comment model, making it available for other parts of the application to use. This allows other files or modules to import and utilize the Comment model for performing database operations related to comments.
module.exports = Comment;