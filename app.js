let express = require('express');
let exphbs = require('express-handlebars');
let AuthController = require('./auth/AuthController');
let UserController = require('./user/UserController');
let UserPostController = require('./user/UserPostController')
let db = require('./db');

//Config and variable setup
PORT = process.env.PORT || 3000;
let app = express();

//Middlewares
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Routes
app.use('api/auth', AuthController);
app.use('api/users', UserController);
app.use('api/posts', UserPostController);




module.exports = app;