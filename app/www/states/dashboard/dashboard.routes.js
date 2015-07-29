(function() {
  'use strict';
  angular.module('historico-saude.state.dashboard', ['historico-saude.state.dashboard.controller'])

    .config(configDoenca);

  function configDoenca($stateProvider) {
    $stateProvider
      .state('app.dashboard', {
        url: "/dashboard",
        views: {
          'menuContent': {
            templateUrl: "states/dashboard/dashboard.html",
            controller: 'DashboardController'
          }
        }
      });
  }
})();
