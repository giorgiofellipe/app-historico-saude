(function() {
  'use strict';
  angular.module('historico-saude.state.denticao-list.controller', [])
    .controller('DenticaoListController', DenticaoList);

  function DenticaoList($scope, $rootScope, $state, $stateParams, $timeout, $http, $ionicFilterBar, apiUrl, Object) {
    $scope.denticoes = [];
      $scope.denticoesList = ["Leite","Permanente"];
      $scope.denteList = [
        "Inciso Superior",
        "Inciso Inferior",
        "Canino Superior",
        "Canino Inferior",
        "Premolar Superior",
        "Premolar Inferior",
        "Molar Superior",
        "Molar Inferior"
      ];

    var filterBarInstance;

    $scope.new = function() {
      $state.go('app.denticao', {action: 'new'});
    };

    $scope.edit = function(denticao) {
      Object.set(denticao);      
      $state.go('app.denticao', {action: 'edit'});
    };

    $scope.dividerFunction = function(key) {
      return key;
    };

    $scope.refresh = function(forceDelay) {
      var timeout = 0;
      if (forceDelay) {
        timeout = 500;
      }
      $scope.denticoes = null;
      $timeout(function() {
        $http.get(apiUrl + '/denticao/user/' + $rootScope.user.id)
          .success(function(data, status, headers, config) {
            refreshItems(data);
          })
          .error(function(data, status, headers, config) {
            console.log('error', status, data);
          });
        $scope.$broadcast('scroll.refreshComplete');
      }, timeout);
    };

    $scope.remove = function(denticao) {
      $http.delete(apiUrl + '/denticao/' + denticao.id)
          .success(function(){
            $scope.refresh(true);
          })
          .error(function(){
            console.log('error', status, data);
      });
    };

    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.denticoes,
        update: function (filteredItems) {
          refreshItems(filteredItems);
        }
      });
    };

    function refreshItems(newItems) {
      removeAllDividers();
      $scope.denticoes = newItems;
    };

    function removeAllDividers() {
      var result = document.getElementsByClassName("item-divider");
      var wrappedResult = angular.element(result);
      wrappedResult.remove();
    }

    $scope.refresh();
  }
})();
