angular.module('respTodo')
  .directive('todoEscape', [function() {

    var ESC_KEY = 27;

    function link(scope, element, attrs) {
      element.bind('keydown', function(event) {
        if (event.keyCode === ESC_KEY) {
          scope.$apply(attrs.todoEscape);
        }
      });
    }

    return {
      link: link
    };
  }]);