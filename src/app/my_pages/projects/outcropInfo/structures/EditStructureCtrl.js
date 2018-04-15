(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('EditStructureCtrl', EditStructureCtrl);
  
    /** @ngInject */
    function EditStructureCtrl($scope, $filter,$uibModalInstance,Structure,structureObject) {

        $scope.structure = structureObject;

        $scope.editStructure = function () {
            Structure.updateStructure($scope.structure).then(function (response) {
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }

  }
  
  })();
  