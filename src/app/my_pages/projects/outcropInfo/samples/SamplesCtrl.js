(function () {
    'use strict';
  
    angular.module('RockDroid.pages.projects')
      .controller('SamplesCtrl', SamplesCtrl);
  
    /** @ngInject */
    function SamplesCtrl($scope,$uibModal,$stateParams) {
      var vm = this;
      vm.samples = [1,2,3,4,5,6];
      vm.label = $stateParams.label;

      $scope.newSample = function () {
        $uibModal.open({
          animation: true,
          templateUrl: 'app/my_pages/projects/outcropInfo/samples/new_sample.html',
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
  