(function() {
  'use strict';
  angular.module('historico-saude.state.doenca-list.controller', [])
    .controller('DoencaListController', DoencaList);

  function DoencaList($scope, $rootScope, $state, $timeout, $http) {
      $scope.doencas = [];

      $scope.new = function() {
        $state.go('app.doenca', {action: 'new'});
      };

      $scope.edit = function(horario) {
        Object.set(horario);
        $state.go('app.doenca', {action: 'edit'});
      };

      $scope.refresh = function(forceDelay) {
        var timeout = 0;
        if (forceDelay) {
          timeout = 500;
        }
        $scope.doencas = null;
        $timeout(function() {

          $http.get($rootScope.serverUrl + '/doenca')
            .success(function(data, status, headers, config) {
              $scope.doencas = data;
            })
            .error(function(data, status, headers, config) {
              console.log('error', status, data);
            });
          //  $scope.doencas = doencas;
            $scope.$broadcast('scroll.refreshComplete');
          //
        }, timeout);
      };

      $scope.remove = function() {

        $scope.refresh(true);
      };

      $scope.refresh();
    }
})();
