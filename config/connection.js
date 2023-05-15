require('dotenv').config(); // The require('dotenv').config() statement is used to load and configure environment variables from a .env file into the Node.js application.

const Sequelize = require('sequelize'); // The const Sequelize = require('sequelize') statement imports the sequelize module, which is a popular Node.js ORM (Object-Relational Mapping) library for interacting with SQL databases.

const sequelize = process.env.JAWSDB_URL ? new Sequelize(process.env.JAWSDB_URL) : new Sequelize( // The code snippet initializes a Sequelize instance named sequelize based on the environment variables. It checks if there is a JAWSDB_URL environment variable available, which typically holds the database connection URL in a cloud environment. 
    
process.env.DB_NAME, // The process.env.DB_NAME refers to the environment variable DB_NAME, which typically holds the name of the database to connect to. 
    process.env.DB_USER, // The process.env.DB_USER refers to the environment variable DB_USER, which typically holds the username or credentials used for authenticating and connecting to the database. 
    process.env.DB_PW, { // The process.env.DB_PW refers to the environment variable DB_PW, which typically holds the password associated with the username used for authenticating and connecting to the database.
      host: 'localhost', // The host: 'localhost' configuration option specifies the host where the database is located. In this case, it indicates that the database server is running on the local machine (localhost). 
      dialect: 'mysql', // The dialect: 'mysql' configuration option specifies the dialect to be used by Sequelize when connecting to the database.
      dialectOptions: { // The dialectOptions property is used to provide additional options and configurations specific to the chosen database dialect
        decimalNumbers: true, // The decimalNumbers: true option within the dialectOptions object enables support for decimal numbers in the database.
      },
    });

module.exports = sequelize; // The } closing curly brace represents the end of the dialectOptions object.