(function () {
    'use strict';
  
    angular.module('RockDroid.pages.projects')
      .controller('StructuresCtrl', StructuresCtrl);
  
    /** @ngInject */
    function StructuresCtrl($scope,$uibModal,$stateParams) {
      var vm = this;
      vm.structures = [1,2,3,4,5,6];
      vm.label = $stateParams.label;

      $scope.newStructure = function () {
        $uibModal.open({
          animation: true,
          templateUrl: 'app/my_pages/projects/outcropInfo/structures/new_structure.html',
          controller: 'NewStructureCtrl',
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
  