(function() {
  'use strict';
  angular.module('historico-saude.state.alergia-list.controller', [])
    .controller('AlergiaListController', AlergiaList);

  function AlergiaList($scope, $rootScope, $state, $stateParams, $timeout, $http, $ionicFilterBar, apiUrl, Object) {
    $scope.alergias = [];
    var filterBarInstance;

    $scope.new = function() {
      $state.go('app.alergia', {action: 'new'});
    };

    $scope.edit = function(alergia) {
      Object.set(alergia);
      $state.go('app.alergia', {action: 'edit'});
    };

    $scope.dividerFunction = function(key) {
      return key;
    };

    $scope.refresh = function(forceDelay) {
      var timeout = 0;
      if (forceDelay) {
        timeout = 500;
      }
      $scope.alergias = null;
      $timeout(function() {
        $http.get(apiUrl + '/alergia/user/' + $rootScope.user.id)
          .success(function(data, status, headers, config) {
            refreshItems(data);
          })
          .error(function(data, status, headers, config) {
            console.log('error', status, data);
          });
        $scope.$broadcast('scroll.refreshComplete');
      }, timeout);
    };

    $scope.remove = function(alergia) {
      $http.delete(apiUrl + '/alergia/' + alergia.id)
          .success(function(){
            $scope.refresh(true);
          })
          .error(function(){
            console.log('error', status, data);
      });
    };

    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.alergias,
        update: function (filteredItems) {
          refreshItems(filteredItems);
        }
      });
    };

    function refreshItems(newItems) {
      removeAllDividers();
      $scope.alergias = newItems;
    };

    function removeAllDividers() {
      var result = document.getElementsByClassName("item-divider");
      var wrappedResult = angular.element(result);
      wrappedResult.remove();
    };

    $scope.refresh();
  }
})();
