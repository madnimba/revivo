const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


// Constants
const indexRouter = require('./routers/indexRouters');

// Set the view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Middleware
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cookieParser());




app.use('/app', indexRouter);

module.exports =app;


