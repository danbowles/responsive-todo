/*global angular, respTodo */
/*jshint unused:false */
'use strict';

respTodo.controller('TodoCtrl', function TodoCtrl($scope, $http) {
	$http.get('/api/todos')
    .success(function(listData) {
      $scope.list = listData;
    })
    .error(function(error) {
      throw error;
    });

  $scope.updateTodo = function(todo) {
    $http.put('/api/todos/' + todo._id, todo)
      .error(function(error) {
        throw error;
      });
  };

  $scope.createTodo = function() {
    $scope.newTodo = $scope.newTodo.trim();

    if (!$scope.newTodo.length) return;

    var newTodo = {
      name: $scope.newTodo.trim(),
      done: false
    };

    $http.post('/api/todos', newTodo)
      .error(function(error) {
        throw error;
      });

    // on success...
    $scope.newTodo = '';
  };
});
