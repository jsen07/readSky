// The code snippet imports the Model and DataTypes objects from the sequelize library. 
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
// The code snippet imports the bcrypt library, which provides functions for hashing and comparing passwords in a Node.js application.
const bcrypt = require('bcrypt');

// The code snippet defines a User class that extends the Model class.
class User extends Model {
    // The checkPassword method defined within the User class takes a single argument, loginPw, which represents the password provided during a login attempt.
    checkPassword(loginPw) {
        // The checkPassword method defined within the User class takes a single argument, loginPw, which represents the password provided during a login attempt. 
        return bcrypt.compareSync(loginPw, this.password);
    }
}
// The User.init method is used to initialize and define the User model.
User.init(
    {
        // The id attribute defined within the User.init method represents the primary key of the User model.
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // The first_name attribute defined within the User.init method represents the first_name field of the User model.
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // The last_name attribute defined within the User.init method represents the last_name field of the User model.
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // The username attribute defined within the User.init method represents the username field of the User model.
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //The email attribute defined within the User.init method represents the email field of the User model. It is of type STRING and is configured with allowNull: false, indicating that it must have a value and cannot be empty.
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            uniqueL: true,
            validate: {
                isEmail: true
            }
        },
        // The password attribute defined within the User.init method represents the password field of the User model.
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        // The hooks property defined within the User.init method includes a beforeCreate hook. This hook is executed before creating a new user record in the database.
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
        },
        sequelize, // sequelize indicates the Sequelize instance that is used for this model.
        timestamps: false, // timestamps: false suggests that the User model does not include automatic timestamp fields like createdAt and updatedAt.
        freezeTableName: true, // freezeTableName: true indicates that the table name for the User model should be the same as the model name, preventing Sequelize from automatically pluralizing the table name.
        underscored: true, // underscored: true specifies that the column names in the User model should use underscored naming convention (e.g., created_at instead of createdAt).
        modelName: 'user', // modelName: 'user' sets the model name to 'user', which will be used by Sequelize for various operations.
      }
);
// The module.exports = User; statement at the end of the code exports the User model, making it available for other parts of the application to use.
module.exports = User;