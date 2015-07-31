(function() {
  'use strict';
  angular.module('historico-saude.state.consultaMedica-list', ['historico-saude.state.consultaMedica-list.controller'])

    .config(configConsultaMedica);

  function configConsultaMedica($stateProvider) {
    $stateProvider
      .state('app.consultaMedicas', {
        url: "/consultaMedicas",
        cache: false,
        views: {
          'menuContent': {
            templateUrl: "states/consultaMedica-list/consultaMedica-list.html",
            controller: 'ConsultaMedicaListController'
          }
        }
      });
  }
})();
