(function() {
  'use strict';
  angular.module('historico-saude.state.doenca-list.controller', [])
    .controller('DoencaListController', DoencaList);

  function DoencaList($scope, $rootScope, $state, $stateParams, $timeout, $http, $ionicFilterBar, apiUrl, Object) {
    $scope.doencas = [];
    var filterBarInstance;

    $scope.new = function() {
      $state.go('app.doenca', {action: 'new'});
    };

    $scope.edit = function(doenca) {
      Object.set(doenca);
      $state.go('app.doenca', {action: 'edit'});
    };

    $scope.dividerFunction = function(key) {
      return key;
    };

    $scope.refresh = function(forceDelay) {
      var timeout = 0;
      if (forceDelay) {
        timeout = 500;
      }
      $scope.doencas = null;
      $timeout(function() {
        $http.get(apiUrl + '/doenca')
          .success(function(data, status, headers, config) {
            refreshItems(data);
          })
          .error(function(data, status, headers, config) {
            console.log('error', status, data);
          });
        $scope.$broadcast('scroll.refreshComplete');
      }, timeout);
    };

    $scope.remove = function(doenca) {
      $http.delete(apiUrl + '/doenca/' + doenca.id)
          .success(function(){
            $scope.refresh(true);
          })
          .error(function(){
            console.log('error', status, data);
      });
    };

    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.doencas,
        update: function (filteredItems) {
          refreshItems(filteredItems);
        }
      });
    };

    function refreshItems(newItems) {
      removeAllDividers();
      $scope.doencas = newItems;
    };

    function removeAllDividers() {
      var result = document.getElementsByClassName("item-divider");
      var wrappedResult = angular.element(result);
      wrappedResult.remove();
    };

    $scope.refresh();
  }
})();
