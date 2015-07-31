(function() {
  'use strict';
  angular.module('historico-saude.state.denticao.controller', [])
    .controller('DenticaoController', Denticao);

  function Denticao($scope, $state, $stateParams, $http, Object, apiUrl, $ionicPopup, Filhos) {
      $scope.denticao = {};
      $scope.titleData = "Data";      
      $scope.currentDate = new Date();
      $scope.slots = {epochTime: new Date(), format: 24, step: 1};
      $scope.data = new Date();
      $scope.hora = $scope.slots.epochTime;
      $scope.denticoes = [
        {id:0,nome:"Leite"},
        {id:1,nome:"Permanente"}
      ];
      $scope.dentes = [
        {id:0,nome:"Inciso Superior"},
        {id:1,nome:"Inciso Inferior"},
        {id:2,nome:"Canino Superior"},
        {id:3,nome:"Canino Inferior"},
        {id:4,nome:"Premolar Superior"},
        {id:5,nome:"Premolar Inferior"},
        {id:6,nome:"Molar Superior"},
        {id:7,nome:"Molar Inferior"}
      ];
      $scope.filhos = Filhos.get();

      if ($stateParams.action == 'edit') {
        $scope.denticao = angular.copy(Object.get());
        $scope.data = new Date($scope.denticao.data);
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
        $scope.denticao.data = dataHora;
        $scope.denticao.filho = 1;
        if(!$scope.denticao.reacoes || (!$scope.denticao.denticao && $scope.denticao.denticao !== 0) || (!$scope.denticao.dente && $scope.denticao.dente !== 0)){
            $ionicPopup.alert({
              title: 'Oops! :(',
              template: 'Verifique os campos obrigatórios'
            });
            return false;
        }
        if ($stateParams.action == 'edit') {
          $http.put(apiUrl + '/denticao/' + $scope.denticao.id, $scope.denticao)
          .success(function(){
            $state.go('app.denticoes');
          })
          .error(function(){
            console.log('error', status, data);
          });
        } else {
          $http.post(apiUrl + '/denticao', $scope.denticao)
          .success(function(){
            $state.go('app.denticoes');
          })
          .error(function(){
            console.log('error', status, data);
          });  
        }
      };
    }
})();
