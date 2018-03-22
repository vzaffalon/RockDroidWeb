(function () {
    'use strict';
  
    angular.module('RockDroid.pages.projects')
      .controller('StructuresCtrl', StructuresCtrl);
  
    /** @ngInject */
    function StructuresCtrl($stateParams) {
      var vm = this;
      vm.messages = [];
      vm.label = $stateParams.label;
    }
  
  })();
  