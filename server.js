// Setup
var express         = require('express');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var app             = express();

var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || process.env.IP;
var port    = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT;

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

app.listen(port, ipaddr);
console.log('Started. Listening on ' + ipaddr + ':' + port);

