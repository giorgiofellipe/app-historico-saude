(function() {
  'use strict';
  angular.module('historico-saude.state.filho-list.controller', [])
    .controller('FilhoListController', FilhoList);

  function FilhoList($scope, $rootScope, $state, $stateParams, $timeout, $http, $ionicFilterBar, apiUrl, Object) {
    $scope.filhos = [];
    var filterBarInstance;

    $scope.new = function() {
      $state.go('app.filho', {action: 'new'});
    };

    $scope.edit = function(filho) {
      Object.set(filho);
      $state.go('app.filho', {action: 'edit'});
    };

    $scope.dividerFunction = function(key) {
      return key;
    };

    $scope.refresh = function(forceDelay) {
      var timeout = 0;
      if (forceDelay) {
        timeout = 500;
      }
      $scope.filhos = null;
      $timeout(function() {
        $http.get(apiUrl + '/filho/user/' + $rootScope.user.id)
          .success(function(data, status, headers, config) {
            refreshItems(data);
          })
          .error(function(data, status, headers, config) {
            console.log('error', status, data);
          });
        $scope.$broadcast('scroll.refreshComplete');
      }, timeout);
    };

    $scope.remove = function(filho) {
      $http.delete(apiUrl + '/filho/' + filho.id)
          .success(function(){
            $scope.refresh(true);
          })
          .error(function(){
            console.log('error', status, data);
      });
    };

    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.filhos,
        update: function (filteredItems) {
          refreshItems(filteredItems);
        }
      });
    };

    function refreshItems(newItems) {
      removeAllDividers();
      $scope.filhos = newItems;
    };

    function removeAllDividers() {
      var result = document.getElementsByClassName("item-divider");
      var wrappedResult = angular.element(result);
      wrappedResult.remove();
    };

    $scope.refresh();
  }
})();
