var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

router.param('todoId', function(req, res, next, todoId) {
  Todo.findById(todoId, function(err, todo) {
    if (err) {
      res.send(err);
    }
    req.todo = todo;
    req.newTodo = req.body;
    next();
  });
});

// /todos
// ====================================================
var todosRoute = router.route('/todos');
todosRoute.get(function(req, res) {

  Todo.find(function(err, todos) {
    if (err) {
      res.send(err);
    }

    res.json(todos);
  });
})
.post(function(req, res) {
  var todo = new Todo();
  
  if (req.todoId) {
    res.status(400).json({error: 'Invalid request'}).end();
  }

  todo.name = req.body.name;
  todo.done = false;

  todo.save(function(err) {
    if (err) {
      res.send(err);
    }

    res.json({message: 'Todo Added!', data: todo});
  });
});

// /todos/ID
// ====================================================
todosRoute = router.route('/todos/:todoId');
todosRoute.get(function(req, res) {
  res.json(req.todo);
})
.post(function(req, res) {
  res.status(400).send('Cannot create - Todo exists');
})
.put(function(req, res) {

  req.todo.name = req.newTodo.name;
  req.todo.done = req.newTodo.done;

  req.todo.save(function(err) {
    if (err) {
      res.send(err);
    }
  });
  res.send(req.newTodo);
})
.delete(function(req, res) {
  Todo.remove(req.todo, function(err) {
    if (err) {
      res.send(err);
    }

    res.send('Removed Todo');
  });
});

module.exports = router;