angular.module('respTodo', []);
//
// Todo Category Model
//
function TodoCategory(text, priority, todos) {
  this.text = text;
  this.priority = priority;
  this.tasks = todos || [];
}

TodoCategory.prototype.addTodo = function(todo) {
  this.tasks.push(todo);
};
// end



angular.module('respTodo').controller('TodoCtrl', function TodoCtrl($scope) {
    $scope.categories = [{
      text: "Must Do No Matter What",
      priority: 10,
      tasks: [{
        title: "Take out garbage",
        isDone: false
      },{
        title: "random letters",
        isDone: true
      },{
        title: "words and such",
        isDone: false
      }]
    },{
      text: "It would be nice to do these, too",
      priority: 5,
      tasks: [{
        title: "Take out garbage",
        isDone: false
      },{
        title: "Take out garbage",
        isDone: true
      },{
        title: "Take out garbage",
        isDone: true
      }]
    }];
  });

(function($) {
  $(function() {
    var $body = $('body');
    $('.go-to-nav').click(function(e) {
      e.preventDefault();
      $body.toggleClass('show-nav');
    });
  });
})(jQuery);