(function() {
  'use strict';
  angular.module('historico-saude.state.filho.controller', [])
    .controller('FilhoController', Filho);

  function Filho($scope, $state, $stateParams, $http, Object, apiUrl, $ionicPopup, $rootScope, Filhos) {
    $scope.filho = {};
    $scope.titleData = "Data";
    $scope.data = new Date();
    $scope.hora = 12600;
    $scope.slots = {format: 24, step: 1 };
    $scope.sexos = [{id:0, descricao:'Feminino'},{id:1, descricao:'Masculino'}];
    $scope.signos = [
      {
        id:0,
        nome: 'Aries'
      },
      {
        id:1,
        nome: 'Touro'
      },
      {
        id:2,
        nome: 'Gêmeos'
      },
      {
        id:3,
        nome: 'Cancer'
      },
      {
        id:4,
        nome: 'Leão'
      },
      {
        id:5,
        nome: 'Virgem'
      },
      {
        id:6,
        nome: 'Libra'
      },
      {
        id:7,
        nome: 'Escorpião'
      },
      {
        id:8,
        nome: 'Sargitário'
      },
      {
        id:9,
        nome: 'Capricórnio'
      },
      {
        id:10,
        nome: 'Aquário'
      },
      {
        id:11,
        nome: 'Peixes'
      }
    ];

    if ($stateParams.action == 'edit') {
      $scope.filho = angular.copy(Object.get());
      $scope.data = new Date($scope.filho.dataHoraNascimento);
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
      console.log($scope.filho);
      if(!$scope.filho.nome || !$scope.filho.dataHoraNascimento || !$scope.filho.alturaNascimento ||
         !$scope.filho.localNascimento || !$scope.filho.pesoNascimento || !($scope.filho.sexo >= 0) || !($scope.filho.signo >= 0)) {
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
        .success(function(data){
          var filhos = Filhos.get();
          filhos[filhos.length] = data;
          Filhos.set(filhos);
          $state.go('app.filhos');
        })
        .error(function(data, status, headers, config){
          console.log('error', status, data);
        });
      }
    };
  }
})();
