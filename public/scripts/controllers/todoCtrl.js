/*global angular, respTodo */
/*jshint unused:false */
'use strict';

respTodo.controller('TodoCtrl', function TodoCtrl($scope, $http) {
	$http.get('/api/list')
    .success(function(listData) {
      $scope.list = listData;
    })
    .error(function(error) {
      throw error;
    });

  $scope.updateTodo = function(todo) {
    $http.put('/api/list/' + todo._id, todo)
      .success(function(listData) {
        $scope.list = listData;
      })
      .error(function(error) {
        throw error;
      });
  };
});
