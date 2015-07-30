(function() {
  'use strict';
  angular.module('historico-saude.state.doenca.controller', [])
    .controller('DoencaController', Doenca);

  function Doenca($scope, $state, $http, apiUrl, $ionicPopup) {
      $scope.doenca = {};
      $scope.titleData = "Data";      
      $scope.currentDate = new Date();
      $scope.slots = { epochTime: 12600, format: 24, step: 1 };

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
        var data = $scope.data;
        var hora = new Date($scope.hora);
        console.log(data);
        console.log(hora);
        var string = '';
        var date = new Date();

        $scope.doenca.data = date;
        if(!$scope.doenca.nome || !$scope.doenca.sintomas || !$scope.doenca.tratamento || !$scope.doenca.tratamento){
            $ionicPopup.alert({
              title: 'Oops! :(',
              template: 'Verifique os campos obrigatórios'
            });
            return false;
        }
        $http.post(apiUrl + '/doenca', $scope.doenca)
          .success(function(){
            $state.go('app.doencas');
          })
          .error(function(){
            console.log('error', status, data);
        });
      };
    }
})();
