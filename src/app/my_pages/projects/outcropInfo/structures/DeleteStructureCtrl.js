(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('DeleteStructureCtrl', DeleteStructureCtrl);
  
    /** @ngInject */
    function DeleteStructureCtrl($scope, $filter,$uibModalInstance,structureId,Structure) {

        $scope.deleteStructure = function () {
            Structure.deleteStructure(structureId).then(function (response) {
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  