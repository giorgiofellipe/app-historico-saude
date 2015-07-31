(function() {
  'use strict';
  angular.module('historico-saude.state.ocorrencia-list.controller', [])
    .controller('OcorrenciaListController', OcorrenciaList);

  function OcorrenciaList($scope, $rootScope, $state, $stateParams, $timeout, $http, $ionicFilterBar, apiUrl, Object) {
    $scope.ocorrencias = [];
    
    var filterBarInstance;

    $scope.new = function() {
      $state.go('app.ocorrencia', {action: 'new'});
    };

    $scope.edit = function(ocorrencia) {
      Object.set(ocorrencia);      
      $state.go('app.ocorrencia', {action: 'edit'});
    };

    $scope.dividerFunction = function(key) {
      return key;
    };

    $scope.refresh = function(forceDelay) {
      var timeout = 0;
      if (forceDelay) {
        timeout = 500;
      }
      $scope.ocorrencias = null;
      $timeout(function() {
        $http.get(apiUrl + '/ocorrencia')
          .success(function(data, status, headers, config) {
            refreshItems(data);
          })
          .error(function(data, status, headers, config) {
            console.log('error', status, data);
          });
        $scope.$broadcast('scroll.refreshComplete');
      }, timeout);
    };

    $scope.remove = function(ocorrencia) {
      $http.delete(apiUrl + '/ocorrencia/' + ocorrencia.id)
          .success(function(){
            $scope.refresh(true);
          })
          .error(function(){
            console.log('error', status, data);
      });
    };

    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.ocorrencias,
        update: function (filteredItems) {
          refreshItems(filteredItems);
        }
      });
    };

    function refreshItems(newItems) {
      removeAllDividers();
      $scope.ocorrencias = newItems;
    };

    function removeAllDividers() {
      var result = document.getElementsByClassName("item-divider");
      var wrappedResult = angular.element(result);
      wrappedResult.remove();
    }

    $scope.refresh();
  }
})();
