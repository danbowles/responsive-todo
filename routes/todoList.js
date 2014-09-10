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
  var todoId = db.toObjectID(req.params.item_id);

  var todo = req.body;
  
  db.bind('todos');

  db.todos.findOne({_id: todoId}, function(err, item) {
    if (err) throw err;

    console.log(item);
  });

  // debugger;
  db.todos.update(
    {_id: todoId},
    {$set:
      {
        done: todo.done,
        name: todo.name
      }
    }, function(err, result) {
      var updatedTodo;
      if (err) throw err;
      if (result) console.log('Updated ' + todoId);
    });
});

module.exports = router;