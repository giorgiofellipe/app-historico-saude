(function() {
  'use strict';
  angular.module('historico-saude.state.ocorrencia.controller', [])
    .controller('OcorrenciaController', Ocorrencia);

  function Ocorrencia($scope, $state, $stateParams, $http, Object, apiUrl, $ionicPopup) {
      $scope.ocorrencia = {};
      $scope.titleData = "Data";      
      $scope.currentDate = new Date();
      $scope.slots = {epochTime: new Date(), format: 24, step: 1};
      $scope.data = new Date();
      $scope.hora = $scope.slots.epochTime;

      if ($stateParams.action == 'edit') {
        $scope.ocorrencia = angular.copy(Object.get());
        $scope.data = new Date($scope.ocorrencia.dataHora);
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
        $scope.ocorrencia.dataHora = dataHora;
        $scope.ocorrencia.filho = 1;                
        if(!$scope.ocorrencia.descricao){
            $ionicPopup.alert({
              title: 'Oops! :(',
              template: 'Verifique os campos obrigatórios'
            });
            return false;
        }
        if ($stateParams.action == 'edit') {
          $http.put(apiUrl + '/ocorrencia/' + $scope.ocorrencia.id, $scope.ocorrencia)
          .success(function(){
            $state.go('app.ocorrencias');
          })
          .error(function(){
            console.log('error', status, data);
          });
        } else {
          $http.post(apiUrl + '/ocorrencia', $scope.ocorrencia)
          .success(function(){
            $state.go('app.ocorrencias');
          })
          .error(function(){
            console.log('error', status, data);
          });  
        }
      };
    }
})();
