(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewStructureCtrl', NewStructureCtrl);
  
    /** @ngInject */
    function NewStructureCtrl($scope, $filter,$uibModalInstance,Structure,outcropId) {


        $scope.structure = {};
        $scope.structure.outcrop_id = outcropId;

        $scope.structure.structure_type = 'primary';

        $scope.newStructure = function () {
            Structure.createStructure($scope.structure).then(function (response) {
                debugger;
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  