(function () {
  'use strict';

  angular.module('RockDroid.pages.projects')
    .controller('RocksCtrl', RocksCtrl);

  /** @ngInject */
  function RocksCtrl($scope,$uibModal,$stateParams) {
    var vm = this;
    vm.rocks = [1,2,3,4,5,6,7];
    vm.label = $stateParams.label;

    $scope.newRock = function () {
      $uibModal.open({
        animation: true,
        templateUrl: 'app/my_pages/projects/outcropInfo/rocks/new_rock.html',
        controller: 'NewRockCtrl',
        size: 'md',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };
  }

})();
