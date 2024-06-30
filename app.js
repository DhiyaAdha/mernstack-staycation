var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');

// message session
const session = require('express-session');

// dotenv
require('dotenv').config(); 

// import mongoose
const mongoose = require('mongoose');

// connect to mongoose
// mongoose.set("bufferCommands", false);
mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      serverSelectionTimeoutMS: 1000, // Tingkatkan waktu timeout menjadi 30 detik
    }
  )
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// router admin
const adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

//express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 6000 }
}));

//flash
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//static file sb-admin-2
app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// router admin
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
