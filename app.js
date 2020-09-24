const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();


app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/public/views');


//---------------------------------------------------------
const urlgenerator = require('urlgenerator');
const createURLwithParameters = urlgenerator.createURLwithParameters;
let baseURL = "localhost:3000";

// let parameters = { crap: 'taskybasky' };
// let finalURL = createURLwithParameters(baseURL, parameters);
// console.log("final URL is " , finalURL);
//--------------------------------------------------------------


app.use('/', indexRouter);
app.use('/redirect', indexRouter);
app.use('/task', indexRouter);
app.use('/congrats', indexRouter);

app.use('/users', usersRouter);

app.listen(3000);

module.exports = app;
