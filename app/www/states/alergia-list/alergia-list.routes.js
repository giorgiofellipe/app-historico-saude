(function() {
  'use strict';
  angular.module('historico-saude.state.alergia-list', ['historico-saude.state.alergia-list.controller'])

    .config(configAlergia);

  function configAlergia($stateProvider) {
    $stateProvider
      .state('app.alergias', {
        url: "/alergias",
        cache: false,
        views: {
          'menuContent': {
            templateUrl: "states/alergia-list/alergia-list.html",
            controller: 'AlergiaListController'
          }
        }
      });
  }
})();
