(function() {
  'use strict';
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
  angular.module('historico-saude')
    .config(function ($stateProvider, $urlRouterProvider, $ionicFilterBarConfigProvider) {
      $stateProvider
        .state('root', {
          url: '',
          controller: 'RootController',
          data: {
            authenticate: false
          }
        });

      // Send to login if the URL was not found
      $urlRouterProvider.otherwise('/login');
    });
})();
