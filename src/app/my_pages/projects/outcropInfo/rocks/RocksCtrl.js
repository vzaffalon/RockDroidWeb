(function () {
  'use strict';

  angular.module('RockDroid.pages.projects')
    .controller('RocksCtrl', RocksCtrl);

  /** @ngInject */
  function RocksCtrl($stateParams) {
    var vm = this;
    vm.rocks = [1,2,3,4,5,6,7];
    vm.label = $stateParams.label;
  }

})();
