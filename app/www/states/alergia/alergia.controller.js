(function() {
  'use strict';
  angular.module('historico-saude.state.alergia.controller', [])
    .controller('AlergiaController', Alergia);

  function Alergia($scope, $state, $stateParams, $http, Object, apiUrl, $ionicPopup) {
      $scope.alergia = {};
      $scope.titleData = "Data";
      $scope.data = new Date();
      $scope.hora = 12600;
      $scope.slots = {format: 24, step: 1 };
      

      if ($stateParams.action == 'edit') {
        $scope.alergia = angular.copy(Object.get());
        $scope.data = new Date($scope.alergia.dataPrimeiraOcorrencia);
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
      $scope.alergia.filho = 1;

      $scope.save = function () {

        console.log("aaaa");
        var data = new Date($scope.data);
        data.setHours(0);
        data.setMinutes(0);
        data.setSeconds(0);
        var dataHora = new Date(($scope.hora + parseInt(data.getTime() / 1000)) * 1000);
        $scope.alergia.dataPrimeiraOcorrencia = dataHora;        
        if(!$scope.alergia.componenteAlergico || !$scope.alergia.sintomas || !$scope.alergia.antidoto){
            $ionicPopup.alert({
              title: 'Oops! :(',
              template: 'Verifique os campos obrigatórios'
            });
            return false;
        }
        if ($stateParams.action == 'edit') {
          $http.put(apiUrl + '/alergia/' + $scope.alergia.id, $scope.alergia)
          .success(function(){
            $state.go('app.alergias');
          })
          .error(function(){
            console.log('error', status, data);
          });
        } else {
          $http.post(apiUrl + '/alergia', $scope.alergia)
          .success(function(){
            $state.go('app.alergias');
          })
          .error(function(data, status, headers, config){
            console.log('error', status, data);
          });  
        }        
      };
    }
})();
