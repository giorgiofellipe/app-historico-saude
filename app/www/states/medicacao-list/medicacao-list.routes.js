(function() {
  'use strict';
  angular.module('historico-saude.state.medicacao-list', ['historico-saude.state.medicacao-list.controller'])

    .config(configMedicacao);

  function configMedicacao($stateProvider) {
    $stateProvider
      .state('app.medicacoes', {
        url: "/medicacoes",
        cache: false,
        views: {
          'menuContent': {
            templateUrl: "states/medicacao-list/medicacao-list.html",
            controller: 'MedicacaoListController'
          }
        }
      });
  }
})();
