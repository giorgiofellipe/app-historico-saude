(function() {
  'use strict';
  angular.module('historico-saude.state.denticao', ['historico-saude.state.denticao.controller'])

    .config(configDenticao);

  function configDenticao($stateProvider) {
    $stateProvider
      .state('app.denticao', {
        url: "/denticao/:action",
        views: {
          'menuContent': {
            templateUrl: "states/denticao/denticao.html",
            controller: 'DenticaoController'
          }
        }
      });
  }
})();
