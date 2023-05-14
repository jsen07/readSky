const path = require('path');
const express = require('express');
const session = require('express-session');
const expHandlebars = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const flash = require('connect-flash');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const flash = require('connect-flash')
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = expHandlebars.create({
    // Set the runtime options
    runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

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
app.use(flash());
app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on port ' + PORT));
  });