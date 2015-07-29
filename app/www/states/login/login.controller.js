(function() {
  'use strict';
  angular.module('historico-saude.state.login.controller', [])
    .controller('LoginController', Login);

  function Login($scope, $state) {
      $scope.login = function() {
        $state.go('app.dashboard');
      };

      $scope.signUpUI = function() {
        $state.go('signup');
      };

      $scope.loginUI = function() {
        $state.go('login');
      };

      $scope.signUp = function() {
        $state.go('app.dashboard');
      };
    }
})();
