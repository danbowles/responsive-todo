var mongo = require('mongoskin');
var db = mongo.db('mongodb://' + process.env.IP + ':27017/todos', 
  {native_parser: true}
);

module.exports = db;