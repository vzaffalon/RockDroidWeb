(function () {
    'use strict';
  
    angular.module('RockDroid.pages.projects')
      .controller('SamplesCtrl', SamplesCtrl);
  
    /** @ngInject */
    function SamplesCtrl($stateParams) {
      var vm = this;
      vm.samples = [1,2,3,4,5,6];
      vm.label = $stateParams.label;
    }
  
  })();
  