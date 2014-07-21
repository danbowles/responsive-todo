var express = require('express');
var ObjectId = require('mongoskin').ObjectID;
var router = express.Router();

router.get('/list', function(req, res) {
  var db = req.db;
  
  db.collection('todos').find().toArray(function(err, items) {
    res.json(items);
  });
});

router.put('/list/:item_id', function(req, res) {
  var db = req.db;
  var todoId = req.params.item_id;
  var todo;
  
  todo = db.collection('todos').find({_id: new ObjectId(todoId)})
    .toArray(function(err, item) {
      res.json(item);
    });
});

module.exports = router;