(function() {
  'use strict';
  angular.module('historico-saude.state.login', ['historico-saude.state.login.controller'])

    .config(configLogin);

  function configLogin($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'states/login/login.html',
        controller: 'LoginController',
        data: {
          authenticate: false
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'states/login/signup.html',
        controller: 'LoginController',
        data: {
          authenticate: false
        }
      });
  }
})();
