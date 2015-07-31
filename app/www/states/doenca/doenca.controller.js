(function() {
  'use strict';
  angular.module('historico-saude.state.doenca.controller', [])
    .controller('DoencaController', Doenca);

  function Doenca($scope, $state, $stateParams, $http, Object, apiUrl, $ionicPopup, Filhos) {
      $scope.doenca = {};
      $scope.titleData = "Data";
      $scope.data = new Date();
      $scope.hora = 12600;
      $scope.slots = {format: 24, step: 1 };
      $scope.filhos = Filhos.get();

      if ($stateParams.action == 'edit') {
        $scope.doenca = angular.copy(Object.get());
        $scope.data = new Date($scope.doenca.data);
        console.log($scope.data);
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
        $scope.doenca.data = dataHora;
        console.log($scope.doenca.data);
        if(!$scope.doenca.nome || !$scope.doenca.sintomas || !$scope.doenca.tratamento || !$scope.doenca.tratamento){
            $ionicPopup.alert({
              title: 'Oops! :(',
              template: 'Verifique os campos obrigatórios'
            });
            return false;
        }
        if ($stateParams.action == 'edit') {
          $http.put(apiUrl + '/doenca/' + $scope.doenca.id, $scope.doenca)
          .success(function(){
            $state.go('app.doencas');
          })
          .error(function(){
            console.log('error', status, data);
          });
        } else {
          $http.post(apiUrl + '/doenca', $scope.doenca)
          .success(function(){
            $state.go('app.doencas');
          })
          .error(function(data, status, headers, config){
            console.log('error', status, data);
          });  
        }        
      };
    }
})();
