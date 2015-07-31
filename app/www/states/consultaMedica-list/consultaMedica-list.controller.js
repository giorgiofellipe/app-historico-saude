(function() {
  'use strict';
  angular.module('historico-saude.state.consultaMedica-list.controller', [])
    .controller('ConsultaMedicaListController', ConsultaMedicaList);

  function ConsultaMedicaList($scope, $rootScope, $state, $stateParams, $timeout, $http, $ionicFilterBar, apiUrl, Object) {
    $scope.consultaMedicas = [];
    
    var filterBarInstance;

    $scope.new = function() {
      $state.go('app.consultaMedica', {action: 'new'});
    };

    $scope.edit = function(consultaMedica) {
      Object.set(consultaMedica);      
      $state.go('app.consultaMedica', {action: 'edit'});
    };

    $scope.dividerFunction = function(key) {
      return key;
    };

    $scope.refresh = function(forceDelay) {
      var timeout = 0;
      if (forceDelay) {
        timeout = 500;
      }
      $scope.consultaMedicas = null;
      $timeout(function() {
        $http.get(apiUrl + '/consultaMedica')
          .success(function(data, status, headers, config) {
            refreshItems(data);
          })
          .error(function(data, status, headers, config) {
            console.log('error', status, data);
          });
        $scope.$broadcast('scroll.refreshComplete');
      }, timeout);
    };

    $scope.remove = function(consultaMedica) {
      $http.delete(apiUrl + '/consultaMedica/' + consultaMedica.id)
          .success(function(){
            $scope.refresh(true);
          })
          .error(function(){
            console.log('error', status, data);
      });
    };

    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.consultaMedicas,
        update: function (filteredItems) {
          refreshItems(filteredItems);
        }
      });
    };

    function refreshItems(newItems) {
      removeAllDividers();
      $scope.consultaMedicas = newItems;
    };

    function removeAllDividers() {
      var result = document.getElementsByClassName("item-divider");
      var wrappedResult = angular.element(result);
      wrappedResult.remove();
    }

    $scope.refresh();
  }
})();
