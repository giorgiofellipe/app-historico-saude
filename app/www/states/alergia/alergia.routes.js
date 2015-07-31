(function() {
  'use strict';
  angular.module('historico-saude.state.alergia', ['historico-saude.state.alergia.controller'])

    .config(configDoenca);

  function configDoenca($stateProvider) {
    $stateProvider
      .state('app.alergia', {
        url: "/alergia/:action",
        views: {
          'menuContent': {
            templateUrl: "states/alergia/alergia.html",
            controller: 'AlergiaController'
          }
        }
      });
  }
})();
