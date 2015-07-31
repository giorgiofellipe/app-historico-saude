(function() {
  'use strict';
  angular.module('historico-saude.state.medicacao-list.controller', [])
    .controller('MedicacaoListController', MedicacaoList);

  function MedicacaoList($scope, $rootScope, $state, $stateParams, $timeout, $http, $ionicFilterBar, apiUrl, Object) {
    $scope.medicacoes = [];
    $scope.classificacaoList = ["Analgésico","Antimicrobiano","Antisseptico","Dermatologico","Parasiticida","Vitamina","Antibiotico","Outros"];
    $scope.eficaciaList = ["Resolveu","Resolveu Parcial","Não Resolveu"];

    var filterBarInstance;

    $scope.new = function() {
      $state.go('app.medicacao', {action: 'new'});
    };

    $scope.edit = function(medicacao) {
      Object.set(medicacao);      
      $state.go('app.medicacao', {action: 'edit'});
    };

    $scope.dividerFunction = function(key) {
      return key;
    };

    $scope.refresh = function(forceDelay) {
      var timeout = 0;
      if (forceDelay) {
        timeout = 500;
      }
      $scope.medicacoes = null;
      $timeout(function() {
        $http.get(apiUrl + '/medicacao')
          .success(function(data, status, headers, config) {
            refreshItems(data);
          })
          .error(function(data, status, headers, config) {
            console.log('error', status, data);
          });
        $scope.$broadcast('scroll.refreshComplete');
      }, timeout);
    };

    $scope.remove = function(medicacao) {
      $http.delete(apiUrl + '/medicacao/' + medicacao.id)
          .success(function(){
            $scope.refresh(true);
          })
          .error(function(){
            console.log('error', status, data);
      });
    };

    $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.medicacoes,
        update: function (filteredItems) {
          refreshItems(filteredItems);
        }
      });
    };

    function refreshItems(newItems) {
      removeAllDividers();
      $scope.medicacoes = newItems;
    };

    function removeAllDividers() {
      var result = document.getElementsByClassName("item-divider");
      var wrappedResult = angular.element(result);
      wrappedResult.remove();
    }

    $scope.refresh();
  }
})();
