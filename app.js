const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


const app = express();
const jsonParser = bodyParser.json()


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/form', indexRouter);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/public/views');
app.use(cookieParser());


app.use('/getForm', indexRouter);
app.use('/', indexRouter);
app.use('/redirect', indexRouter);
app.use('/task', indexRouter);
app.use('/congrats', indexRouter);
app.use('/login', indexRouter);
app.use('/registration', indexRouter);
app.use('/admin', indexRouter);

app.use('/users', usersRouter);


app.listen(3000);
console.log('Server started...');
module.exports = app;

