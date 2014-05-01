// Setup
var express         = require('express');
var path            = require('path');
var favicon         = require('static-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');

// TODO database
// TODO routes

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));

// TODO - move to 'www' or similar file
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || process.env.IP;
var port    = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT;

app.listen(port, ipaddr);
console.log('Started. Listening on ' + ipaddr + ':' + port);
// end TODO

