(function() {
  'use strict';
  angular.module('historico-saude.state.consultaMedica', ['historico-saude.state.consultaMedica.controller'])

    .config(configConsultaMedica);

  function configConsultaMedica($stateProvider) {
    $stateProvider
      .state('app.consultaMedica', {
        url: "/consultaMedica/:action",
        views: {
          'menuContent': {
            templateUrl: "states/consultaMedica/consultaMedica.html",
            controller: 'ConsultaMedicaController'
          }
        }
      });  
  }
})();
