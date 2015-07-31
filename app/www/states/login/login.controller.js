(function() {
  'use strict';
  angular.module('historico-saude.state.login.controller', [])
    .controller('LoginController', Login);

  function Login($scope, $state, $http, apiUrl, $ionicPopup, $rootScope) {
    $scope.shownGroupPai = false;
    $scope.shownGroupMae = false;
    $scope.estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
    $scope.pai = {uf: $scope.estados[0], sexo: 1, dataNascimento: new Date()};
    $scope.mae = {uf: $scope.estados[0], sexo: 0, dataNascimento: new Date()};
    //mock PAI
    $scope.pai.nome = 'Pai';
    $scope.pai.email = 'pai@pai.com';
    $scope.pai.endereco = 'Endereco';
    $scope.pai.numero = '123';
    $scope.pai.bairro = 'Bai';
    $scope.pai.cidade = 'ABC';
    $scope.pai.telefone = '1234';
    //mock MAE
    $scope.mae.nome = 'Mae';
    $scope.mae.email = 'mae@mae.com';
    $scope.mae.endereco = 'Endereco';
    $scope.mae.numero = '123';
    $scope.mae.bairro = 'Bai';
    $scope.mae.cidade = 'ABC';
    $scope.mae.telefone = '1234';

    $scope.login = function() {
      console.log({email: $scope.email, senha: $scope.senha});
      $http.post(apiUrl + '/usuario/login', {email: $scope.email, senha: $scope.senha})
        .success(function(data, status){
          if (data) {
            $rootScope.user = true;
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
          $scope.pai.usuario = data;
          $scope.mae.usuario = data;
          cadastraPessoa($scope.pai);
          cadastraPessoa($scope.mae);
        })
        .error(function(data, status, headers, config){
          console.log('error', status, data);
        });
      $state.go('app.dashboard');
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
    }

    $scope.toggleGroup = function(group) {
      if (group == 'pai') {
        $scope.shownGroupPai = !$scope.shownGroupPai;
      } else {
        $scope.shownGroupMae = !$scope.shownGroupMae;
      }
    };
  }
})();
