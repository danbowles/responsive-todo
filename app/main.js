// Setup
var express         = require('express');
var path            = require('path');
var favicon         = require('static-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

var database = require('./config/database');
var todoList = require('./routes/todoList');
var routes   = require('./routes/index');
var app      = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.static(__dirname + '/../public'));

database.connect();

app.use('/', routes);
app.use('/api', todoList);

app.use(function(req, res, next) {
  res.status(404);
  res.render('error', {
    title: '404 - Not Found',
    message: 'Not Found'
  });
  return;
});

module.exports = app;
