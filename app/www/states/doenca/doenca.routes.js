(function() {
  'use strict';
  angular.module('historico-saude.state.doenca', ['historico-saude.state.doenca.controller'])

    .config(configDoenca);

  function configDoenca($stateProvider) {
    $stateProvider
      .state('app.doenca', {
        url: "/doenca/:action",
        views: {
          'menuContent': {
            templateUrl: "states/doenca/doenca.html",
            controller: 'DoencaController'
          }
        }
      });
  }
})();
