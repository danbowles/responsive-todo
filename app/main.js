var express         = require('express');
var router          = express.Router();
var app             = express();

var passport        = require('passport');
var flash           = require('connect-flash');
var path            = require('path');
var favicon         = require('serve-favicon');
var morgan          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var session         = require('express-session');

var apiRoutes       = require('./routes/api');
var appRouter       = require('./routes/routes')(router, passport);

// Configurations
require('./config/database').connect();
require('./config/passport')(passport);

// Express
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname,'../public','assets','favicon.ico')));
app.use(express.static(path.join(__dirname,'../public')));

app.use(bodyParser.json()); // .json needed?
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(morgan('dev'));

// Passport
app.use(session({
  secret: '3il3yG1rL',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
app.use('/', appRouter);
app.use('/api', apiRoutes);

app.use(function(req, res, next) {
  res.status(404);
  res.render('error', {
    title: '404 - Not Found',
    message: 'Not Found'
  });
  return;
});

module.exports = app;
