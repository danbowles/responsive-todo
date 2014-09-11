var debug = require('debug')('api');
var express = require('express');
var ObjectId = require('mongoskin').ObjectID;
var router = express.Router();

router.get('/todos', function(req, res) {
  var db = req.db;
  
  db.collection('todos').find().toArray(function(err, items) {
    res.json(items);
  });
});

router.put('/todos/:todo_id', function(req, res) {
  var db = req.db;
  var todoId = db.toObjectID(req.params.todo_id);

  var todo = req.body;
  
  db.bind('todos');

  // TODO - find first & return 400 if not found
  // db.todos.findOne({_id: todoId}, function(err, item) {
  //   if (err) throw err;

  //   console.log(item);
  // });

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
      if (result) {
        debug('Updated ' + todoId);
        res.status(204).end();
      }
    });
});

module.exports = router;