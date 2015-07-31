(function() {
  'use strict';
  angular.module('historico-saude.state.consultaMedica.controller', [])
    .controller('ConsultaMedicaController', ConsultaMedica);

  function ConsultaMedica($scope, $state, $stateParams, $http, Object, apiUrl, $ionicPopup, Filhos) {
      $scope.consultaMedica = {};
      $scope.titleData = "Data";      
      $scope.currentDate = new Date();
      $scope.slots = {epochTime: new Date(), format: 24, step: 1};
      $scope.data = new Date();
      $scope.hora = $scope.slots.epochTime;
      $scope.filhos = Filhos.get();

      if ($stateParams.action == 'edit') {
        $scope.consultaMedica = angular.copy(Object.get());
        $scope.data = new Date($scope.consultaMedica.dataHora);
        $scope.consultaMedica.filho = $scope.consultaMedica.filho.id;
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
        var dataHora = new Date(parseInt($scope.hora / 1000) + parseInt(data.getTime()));
        $scope.consultaMedica.dataHora = dataHora;        
        if(!$scope.consultaMedica.descricao || !$scope.consultaMedica.medico || !$scope.consultaMedica.especialidade){
            $ionicPopup.alert({
              title: 'Oops! :(',
              template: 'Verifique os campos obrigatórios'
            });
            return false;
        }
        if ($stateParams.action == 'edit') {
          $http.put(apiUrl + '/consultaMedica/' + $scope.consultaMedica.id, $scope.consultaMedica)
          .success(function(){
            $state.go('app.consultaMedicas');
          })
          .error(function(){
            console.log('error', status, data);
          });
        } else {
          $http.post(apiUrl + '/consultaMedica', $scope.consultaMedica)
          .success(function(){
            $state.go('app.consultaMedicas');
          })
          .error(function(){
            console.log('error', status, data);
          });  
        }
      };
    }
})();
