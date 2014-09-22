/*global angular, respTodo */
/*jshint unused:false */
'use strict';

respTodo.controller('TodoCtrl', function TodoCtrl($scope, $http, $filter) {
  var todos = [];

  $scope.$watch('todos', function(newVal, oldVal) {
    $scope.incompleteCount = $filter('filter')(todos, {done: false}).length;
    $scope.completeCount = todos.length - $scope.incompleteCount;
    $scope.subTitle = todos.length ? 'Get Doin\'' : 'Nothin\' here - add something!';
  }, true);
    // total = length
    // complete = filter where done==true
    // incomplete = filter where done==false

	$http.get('/todos')
    .success(function(listData) {
      todos = $scope.todos = listData;
    })
    .error(function(error) {
      throw error;
    });

  $scope.editTodo = function(todo) {
    $scope.editingTodo = todo;
    $scope.originalTodo = todo;
    // TODO
  };

  $scope.finishEditing = function(todo) {
    $scope.editingTodo = null;

    todo.name = todo.name.trim();

    if (!todo.name) {
      $scope.removeTodo(todo);
    } else {
      $scope.updateTodo(todo);
    }
  };

  $scope.updateTodo = function(todo) {
    $http.put('/todos/' + todo._id, todo)
      .error(function(error) {
        throw error;
      });
  };

  $scope.removeTodo = function(todo) {
    $http.delete('/todos/' + todo._id, todo)
      .error(function(error) {
        throw error;
      });

    $scope.todos.splice($scope.todos.indexOf(todo), 1);
  };

  $scope.createTodo = function() {
    $scope.newTodo = $scope.newTodo.trim();

    if (!$scope.newTodo.length) {
      return;
    }

    var newTodo = {
      name: $scope.newTodo,
      done: false
    };

    $http.post('/todos', newTodo)
      .success(function(result) {
        newTodo._id = result.data._id;
        console.log(newTodo);
      })
      .error(function(error) {
        throw error;
      });

    $scope.newTodo = '';
    $scope.todos.push(newTodo);
  };
});
