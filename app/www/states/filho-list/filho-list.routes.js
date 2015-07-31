(function() {
  'use strict';
  angular.module('historico-saude.state.filho-list', ['historico-saude.state.filho-list.controller'])

    .config(configFilho);

  function configFilho($stateProvider) {
    $stateProvider
      .state('app.filhos', {
        url: "/filhos",
        cache: false,
        views: {
          'menuContent': {
            templateUrl: "states/filho-list/filho-list.html",
            controller: 'FilhoListController'
          }
        }
      });
  }
})();
