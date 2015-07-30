(function() {
  'use strict';
  angular.module('historico-saude.state.doenca-list', ['historico-saude.state.doenca-list.controller'])

    .config(configDoenca);

  function configDoenca($stateProvider) {
    $stateProvider
      .state('app.doencas', {
        url: "/doencas",
        cache: false,
        views: {
          'menuContent': {
            templateUrl: "states/doenca-list/doenca-list.html",
            controller: 'DoencaListController'
          }
        }
      });
  }
})();
