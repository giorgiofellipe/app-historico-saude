(function() {
  'use strict';
  angular.module('historico-saude.app.controller', [])
    .controller('RootController', function ($scope, $rootScope, $state) {
      $rootScope.serverUrl = 'http://localhost:1337';

      $state.go('app.dashboard');
    });
})();