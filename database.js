var debug = require('debug')('mongodb');
var mongoose = require('mongoose');

function Database() {
  this.connectionString  = (process.env.IP || '127.0.0.1') + ':27017/todos';
}

Database.prototype.connect = function() {
  
  if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    this.connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + ':' +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/todos';
  }

  debug(this.connectionString);

  mongoose.connect('mongodb://' + this.connectionString);
};

module.exports = new Database();