(function() {
  'use strict';
  angular.module('historico-saude.state.ocorrencia-list', ['historico-saude.state.ocorrencia-list.controller'])

    .config(configOcorrencia);

  function configOcorrencia($stateProvider) {
    $stateProvider
      .state('app.ocorrencias', {
        url: "/ocorrencias",
        cache: false,
        views: {
          'menuContent': {
            templateUrl: "states/ocorrencia-list/ocorrencia-list.html",
            controller: 'OcorrenciaListController'
          }
        }
      });
  }
})();
