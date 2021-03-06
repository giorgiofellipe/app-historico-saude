(function() {
  'use strict';
  angular.module('historico-saude.state.menu.controller', [])
    .controller('MenuController', Menu);

  function Menu($scope, $state, $rootScope) {
    $rootScope.platform = ionic.Platform;

    $scope.logout = function() {
      $rootScope.user = null;
      $state.go('login');
    };
  }
})();
