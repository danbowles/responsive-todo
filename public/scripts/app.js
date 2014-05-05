angular.module('respTodo', []);

angular.module('respTodo').controller('TodoCtrl', function TodoCtrl($scope, $http) {
    $http.get('/api/list')
      .success(function(listData) {
        $scope.list = listData;
      })
      .error(function(error) {
        console.log("Error: " + error);
      });
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