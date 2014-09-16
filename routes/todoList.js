var debug = require('debug')('api');
var express = require('express');
var ObjectId = require('mongoskin').ObjectID;
var router = express.Router();


//
// GET Todos
// 
router
.get('/todos', function(req, res) {
  var db = req.db;
  
  db.collection('todos').find().toArray(function(err, items) {
    res.json(items);
  });
})
.post('/todos', function(req, res) {
  var db = req.db;
  var todo = req.body;

  db.bind('todos');

  db.todos.insert(todo, function(err) {
    if (err) {
      console.log("Cannot Insert:", err);
      req.status(400).end();
    }
  });
})
.put('/todos/:todo_id', function(req, res) {
  var db = req.db;
  var todoId = db.toObjectID(req.params.todo_id);
  var todo = req.body;
  
  db.bind('todos');

  // TODO - find first & return 404 if not found
  db.todos.findOne({_id: todoId}, function(err, item) {
    if (err) throw err;
    if (!item) res.status(404, 'Todo Item Not Found').end();
  });

  db.todos.update(
    {_id: todoId},
    {$set:
      {
        done: todo.done,
        name: todo.name
      }
    }, function(err, result) {
      if (err) throw err;
      if (result) {
        res.status(204).end();
      }
    });
})
.delete('/todos/:todo_id', function(req, res) {
  var db = req.db;
  var todoId = db.toObjectID(req.params.todo_id);

  db.bind('todos');

  db.todos.findOne({_id: todoId}, function(err, item) {
    if (err) throw err;
    if (!item) res.status(404, 'Todo Item Not Found').end();
    
    db.todos.remove({_id: todoId}, function(err) {
      if (err) throw err;
      res.status(204).end();
    });
  });
});

module.exports = router;