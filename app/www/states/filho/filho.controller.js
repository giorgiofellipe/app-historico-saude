(function() {
  'use strict';
  angular.module('historico-saude.state.filho.controller', [])
    .controller('FilhoController', Filho);

  function Filho($scope, $state, $stateParams, $http, Object, apiUrl, $ionicPopup, $rootScope) {
      $scope.filho = {};
      $scope.titleData = "Data";
      $scope.data = new Date();
      $scope.hora = 12600;
      $scope.slots = {format: 24, step: 1 };
    
      if ($stateParams.action == 'edit') {
        $scope.filho = angular.copy(Object.get());
        $scope.data = new Date($scope.filho.data);
        var newDate = new Date();
        newDate.setHours($scope.data.getHours());
        newDate.setMinutes($scope.data.getMinutes());
        newDate.setSeconds($scope.data.getSeconds());
        $scope.hora = newDate.getTime() / 1000;        
      }

      $scope.callbackDate = function (val) {
        if(typeof(val)!=='undefined'){
            $scope.data = val;
        }
      };
      $scope.callbackTime = function(val){
        if(typeof(val)!=='undefined'){
            $scope.hora = val;
        }
      };

      $scope.save = function () {
        var data = new Date($scope.data);
        data.setHours(0);
        data.setMinutes(0);
        data.setSeconds(0);
        var dataHora = new Date(($scope.hora + parseInt(data.getTime() / 1000)) * 1000);
        $scope.filho.dataHoraNascimento = dataHora;
        $scope.filho.usuario = $rootScope.user;
        if(!$scope.filho.nome || !$scope.filho.sintomas || !$scope.filho.tratamento || !$scope.filho.tratamento){
            $ionicPopup.alert({
              title: 'Oops! :(',
              template: 'Verifique os campos obrigatórios'
            });
            return false;
        }
        if ($stateParams.action == 'edit') {
          $http.put(apiUrl + '/filho/' + $scope.filho.id, $scope.filho)
          .success(function(){
            $state.go('app.filhos');
          })
          .error(function(){
            console.log('error', status, data);
          });
        } else {
          $http.post(apiUrl + '/filho', $scope.filho)
          .success(function(){
            $state.go('app.filhos');
          })
          .error(function(data, status, headers, config){
            console.log('error', status, data);
          });  
        }        
      };
    }
})();
