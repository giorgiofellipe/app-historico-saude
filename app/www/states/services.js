(function() {
  'use strict';
  angular.module('historico-saude.services', [])

    .factory('Object', function() {
      var savedData = {};
      function set(data) {
        savedData = data;
      }
      function get() {
        return savedData;
      }

      return {
        set: set,
        get: get
      }
    })

    .factory('Filhos', function() {
      var savedData = {};
      function set(data) {
        savedData = data;
      }
      function get() {
        return savedData;
      }

      return {
        set: set,
        get: get
      }
    })
  ;
})();