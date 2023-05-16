

const path = require('path'); // The const path = require('path') statement imports the built-in Node.js module path.
const helpers = require('./utils/helpers');


const express = require('express'); // The const express = require('express') statement imports the express module, which is a popular web framework for Node.js.
const session = require('express-session'); // The const session = require('express-session') statement imports the express-session module, which is an Express middleware for managing sessions in web applications.
const expHandlebars = require('express-handlebars'); // The const expHandlebars = require('express-handlebars') statement imports the express-handlebars module, which is an Express view engine for rendering dynamic templates.
const SequelizeStore = require('connect-session-sequelize')(session.Store); // The const SequelizeStore = require('connect-session-sequelize')(session.Store) statement imports the connect-session-sequelize module and creates an instance of the SequelizeStore class.
const flash = require('connect-flash'); // The const flash = require('connect-flash') statement imports the connect-flash module, which is an Express middleware for displaying flash messages to the user.
const routes = require('./controllers'); // The const routes = require('./controllers') statement imports the routes module from the './controllers' file.
const sequelize = require('./config/connection'); // The const sequelize = require('./config/connection') statement imports the sequelize instance from the './config/connection' file.
const app = express(); // The const app = express() statement creates an instance of the Express application.
const PORT = process.env.PORT || 3001; // The const PORT = process.env.PORT || 3001 statement assigns the value of the PORT environment variable to the PORT constant.

//The const hbs = expHandlebars.create({ ... }) statement creates an instance of the express-handlebars view engine with custom configurations.
const hbs = expHandlebars.create({
    // Set the runtime options
    helpers,
    runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

// The const sess = { ... } statement defines the session configuration object for the Express application.
const sess = {
    secret: "Super secret secret",
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

//This code snippet sets up various middleware and configurations for the Express application.
app.use(flash());
app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// The sequelize.sync({ force: false }).then(() => { ... }) statement synchronizes the defined Sequelize models with the database and starts the server to listen on the specified port.
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on port ' + PORT));
  });