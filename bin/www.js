var debug = require('debug')('todo');
var app = require('../app');

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('address', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || 'localhost');

var server = app.listen(app.get('port'), app.get('address'), function() {
  debug('Listening on ' + app.get('address') + ':' + app.get('port'));
});