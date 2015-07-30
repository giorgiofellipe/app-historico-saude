(function() {
  'use strict';
  angular.module('historico-saude.state.denticao-list', ['historico-saude.state.denticao-list.controller'])

    .config(configDoenca);

  function configDoenca($stateProvider) {
    $stateProvider
      .state('app.denticoes', {
        url: "/denticoes",
        cache: false,
        views: {
          'menuContent': {
            templateUrl: "states/denticao-list/denticao-list.html",
            controller: 'DenticaoListController'
          }
        }
      });
  }
})();
