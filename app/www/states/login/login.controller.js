(function() {
  'use strict';
  angular.module('historico-saude.state.login.controller', [])
    .controller('LoginController', Login);

  function Login($scope, $state, $http, apiUrl, $ionicPopup, $rootScope, $timeout, Filhos, $ionicScrollDelegate) {
    //$scope.email = "pai@pai.com";
    //$scope.senha = "123456";

    $scope.shownGroupPai = false;
    $scope.shownGroupMae = false;
    $scope.estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
    $scope.pai = {uf: $scope.estados[0], sexo: 1, dataNascimento: new Date()};
    $scope.mae = {uf: $scope.estados[0], sexo: 0, dataNascimento: new Date()};
    ////mock PAI
    //$scope.pai.nome = 'Pai';
    //$scope.pai.email = 'pai@pai.com';
    //$scope.pai.endereco = 'Endereco';
    //$scope.pai.numero = '123';
    //$scope.pai.bairro = 'Bai';
    //$scope.pai.cidade = 'ABC';
    //$scope.pai.telefone = '1234';
    ////mock MAE
    //$scope.mae.nome = 'Mae';
    //$scope.mae.email = 'mae@mae.com';
    //$scope.mae.endereco = 'Endereco';
    //$scope.mae.numero = '123';
    //$scope.mae.bairro = 'Bai';
    //$scope.mae.cidade = 'ABC';
    //$scope.mae.telefone = '1234';

    $scope.login = function() {
      console.log({email: $scope.email, senha: $scope.senha});
      $http.post(apiUrl + '/usuario/login', {email: $scope.email, senha: $scope.senha})
        .success(function(data, status){
          if (data) {
            $rootScope.user = data;
            carregarFilhos();
            $state.go('app.dashboard');
          } else {
            $ionicPopup.alert({
              title: 'Oops! :(',
              template: 'Email ou senha não conferem!'
            });
          }
        })
        .error(function(data, status, headers, config){
          console.log('error', status, data);
        });
    };

    $scope.signUpUI = function() {
      $state.go('signup');
    };

    $scope.loginUI = function() {
      $state.go('login');
    };

    $scope.signUp = function() {
      $http.post(apiUrl + '/usuario', $scope.user)
        .success(function(data, status){
          console.log('Usuário', data);
          $rootScope.user = data;
          $scope.pai.usuario = data;
          $scope.mae.usuario = data;
          cadastraPessoa($scope.pai);
          cadastraPessoa($scope.mae);
        })
        .error(function(data, status, headers, config){
          console.log('error', status, data);
        });
      $timeout(function() {
        $state.go('app.filho');
      }, 400);
    };

    $scope.callbackDataNascimentoPai = function (val) {
      if(typeof(val)!=='undefined'){
        $scope.pai.dataNascimento = val;
      }
    };

    $scope.callbackDataNascimentoMae = function (val) {
      if(typeof(val)!=='undefined'){
        $scope.mae.dataNascimento = val;
      }
    };

    function cadastraPessoa(pessoa) {
      $http.post(apiUrl + '/pessoa', pessoa)
        .success(function(data, status){
          console.log('Pessoa', data);
        })
        .error(function(data, status, headers, config){
          console.log('error', status, data);
        });
    };

    function carregarFilhos() {
      $http.post(apiUrl + '/usuario/filhos', {user: $rootScope.user.id})
        .success(function(data, status){
          console.log(data);
          Filhos.set(data);
        })
        .error(function(data, status, headers, config){
          console.log('error', status, data);
        });
    };

    $scope.toggleGroup = function(group) {
      if (group == 'pai') {
        $scope.shownGroupPai = !$scope.shownGroupPai;
      } else {
        $scope.shownGroupMae = !$scope.shownGroupMae;
      }
      $ionicScrollDelegate.resize();
    };
  }
})();
