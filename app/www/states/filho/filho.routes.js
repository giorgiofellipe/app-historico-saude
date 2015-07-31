(function() {
  'use strict';
  angular.module('historico-saude.state.filho', ['historico-saude.state.filho.controller'])

    .config(configFilho);

  function configFilho($stateProvider) {
    $stateProvider
      .state('app.filho', {
        url: "/filho/:action",
        views: {
          'menuContent': {
            templateUrl: "states/filho/filho.html",
            controller: 'FilhoController'
          }
        }
      });
  }
})();
