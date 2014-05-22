var mongo = require('mongoskin');
var connectionString = process.env.IP + ':27017/todos';
var db;

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}




db = mongo.db('mongodb://' + connectionString, {native_parser: true});

module.exports = db;