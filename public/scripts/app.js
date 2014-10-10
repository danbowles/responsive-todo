/*global angular, jQuery */
/*jshint unused:false */
'use strict';

var respTodo = angular.module('respTodo', []);

(function($) {
  $(function() {
    var $body = $('body');

    $('.go-to-nav').click(function(e) {
      e.preventDefault();
      $body.toggleClass('show-nav');
    });

    // $('nav a').click(function() {
    //   if ($body.hasClass('show-nav')) {
    //     $body.removeClass('show-nav');
    //   }
    // });
  });
})(jQuery);