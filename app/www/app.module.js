(function() {
  'use strict';
  angular
    .module('historico-saude',
      [
        'ionic',
        'historico-saude.controllers',
        'historico-saude.services',
        'ngCordova',
        'ionic.ion.autoListDivider'
      ])
    .run(function($ionicPlatform, $rootScope, $state) {
      $ionicPlatform.ready(function() {

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          if (ionic.Platform.isAndroid()) {
            StatusBar.backgroundColorByHexString("#00796B");
          } else {
            StatusBar.styleLightContent();
          }
        }
      });

      // UI Router Authentication Check
      //$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      //  if (toState.data.authenticate) {
      //    // User isn’t authenticated
      //    $state.transitionTo("login");
      //    event.preventDefault();
      //  }
      //});
    });
})();
