require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const routes = require('./routes/index');

function relative(dir) {
  return path.join(__dirname, dir);
}

const app = express();

// view engine setup
const templateConfig = {
  partialsDir: relative('/views/partials'),
  extname: 'html',
  defaultLayout: relative('views/layout/layout.html'),
};

app.engine('html', exphbs(templateConfig));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('x-powered-by');
app.use(cookieParser());
app.enable('view cache');
app.use(express.static('public'));
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => { // eslint-disable-line
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

module.exports = app;
