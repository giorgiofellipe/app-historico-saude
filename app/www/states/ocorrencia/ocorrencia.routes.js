(function() {
  'use strict';
  angular.module('historico-saude.state.ocorrencia', ['historico-saude.state.ocorrencia.controller'])

    .config(configOcorrencia);

  function configOcorrencia($stateProvider) {
    $stateProvider
      .state('app.ocorrencia', {
        url: "/ocorrencia/:action",
        views: {
          'menuContent': {
            templateUrl: "states/ocorrencia/ocorrencia.html",
            controller: 'OcorrenciaController'
          }
        }
      });  
  }
})();
