var debug = require('debug')('todo');
var app = require('../app');

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT);
app.set('address', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || 3000);

var server = app.listen(app.get('port'), app.get('address'), function() {
  debug('Listening on ' + server.address() + ':' + server.address().port);
});