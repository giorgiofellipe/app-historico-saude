(function() {
  'use strict';
  angular.module('historico-saude.state.medicacao', ['historico-saude.state.medicacao.controller'])

    .config(configMedicacao);

  function configMedicacao($stateProvider) {
    $stateProvider
      .state('app.medicacao', {
        url: "/medicacao/:action",
        views: {
          'menuContent': {
            templateUrl: "states/medicacao/medicacao.html",
            controller: 'MedicacaoController'
          }
        }
      });
  }
})();
