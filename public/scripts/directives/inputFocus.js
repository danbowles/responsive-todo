angular.module('respTodo')
  .directive('todoFocus', ['$timeout', function($timeout) {
    function link(scope, element, attrs) {
      scope.$watch(attrs.todoFocus, function(value) {
        if (value) {
          $timeout(function() {
            element[0].focus()
          }, 0, false);
        }
      });
    }

    return {
      link: link
    };
  }]);