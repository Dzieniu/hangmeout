var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
require('./models/Riddle');
var routes  = require('./routes');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var app = express();
mongoose.connect('mongodb://heroku_ktqg23bx:mgtitmm35iq7fascp0vgh36tq0@ds135690.mlab.com:35690/heroku_ktqg23bx'
 || 'mongodb://localhost/mypage', { useMongoClient: true });
var dbRoutes = require('./routes/dbroutes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', dbRoutes);

app.get('/', routes.index);
app.get('/:filename', routes.pages);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

