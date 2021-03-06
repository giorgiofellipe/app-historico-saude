(function() {
  'use strict';
  angular.module('historico-saude.state.medicacao.controller', [])
    .controller('MedicacaoController', Medicacao);

  function Medicacao($scope, $state, $stateParams, $http, Object, apiUrl, $ionicPopup, Filhos) {
      $scope.medicacao = {};
      $scope.titleData = "Data";      
      $scope.currentDate = new Date();
      $scope.slots = {epochTime: new Date(), format: 24, step: 1};
      $scope.data = new Date();
      $scope.hora = $scope.slots.epochTime;      
      $scope.filhos = Filhos.get();
      $scope.classificacaoList = [
        {id:0,nome:"Analgésico"},
        {id:1,nome:"Antimicrobiano"},
        {id:2,nome:"Antisseptico"},
        {id:3,nome:"Dermatologico"},
        {id:4,nome:"Parasiticida"},
        {id:5,nome:"Vitamina"},
        {id:6,nome:"Antibiotico"},
        {id:7,nome:"Outros"}];

      
      $scope.eficaciaList = [
        {id:0,nome:"Resolveu"},
        {id:1,nome:"Resolveu Parcial"},
        {id:2,nome:"Não Resolveu"}];

      if ($stateParams.action == 'edit') {
        $scope.medicacao = angular.copy(Object.get());        
        $scope.medicacao.filho = $scope.medicacao.filho.id;
        $scope.data = new Date($scope.medicacao.data);
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
        $scope.medicacao.data = dataHora;        
        if(!$scope.medicacao.posologia || !$scope.medicacao.nomeMedicamento || (!$scope.medicacao.classificacao && $scope.medicacao.classificacao !== 0) || (!$scope.medicacao.eficacia && $scope.medicacao.eficacia !== 0)){
            $ionicPopup.alert({
              title: 'Oops! :(',
              template: 'Verifique os campos obrigatórios'
            });
            return false;
        }
        if ($stateParams.action == 'edit') {
          $http.put(apiUrl + '/medicacao/' + $scope.medicacao.id, $scope.medicacao)
          .success(function(){
            $state.go('app.medicacoes');
          })
          .error(function(){
            console.log('error', status, data);
          });
        } else {
          console.log($scope.medicacao);
          $http.post(apiUrl + '/medicacao', $scope.medicacao)
          .success(function(){
            $state.go('app.medicacoes');
          })
          .error(function(){
            console.log('error', status, data);
          });  
        }
      };
    }
})();
