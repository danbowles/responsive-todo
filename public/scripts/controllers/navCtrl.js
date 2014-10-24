/*global angular, respTodo */
/*jshint unused:false */
'use strict';

respTodo.controller('NavCtrl', function NavCtrl($scope) {
  $scope.showMobileNav = false;

  $scope.toggleMobileNav = function() {
    if ($scope.showMobileNav) {
      $scope.showMobileNav = false;
      return;
    }

    $scope.showMobileNav = true;
  };

});