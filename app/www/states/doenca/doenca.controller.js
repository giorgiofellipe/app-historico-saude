(function() {
  'use strict';
  angular.module('historico-saude.state.doenca.controller', [])
    .controller('DoencaController', Doenca);

  function Doenca($scope, $state, $http, $rootScope) {
      $scope.doenca = {};

      $scope.save = function () {
        $scope.doenca.data = new Date();
        $http.post($rootScope.serverUrl + '/doenca', $scope.doenca)
          .success(function(){
            $state.go('app.doencas');
          })
          .error(function(){
            console.log('error', status, data);
          });
      };
    }
})();
