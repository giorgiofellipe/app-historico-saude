(function() {
  'use strict';
  angular.module('historico-saude.state.menu', ['historico-saude.state.menu.controller'])

    .config(configMenu);

  function configMenu($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'states/menu/menu.html',
        controller: 'MenuController',
        data: {
          authenticate: true
        }
      })
  }
})();
