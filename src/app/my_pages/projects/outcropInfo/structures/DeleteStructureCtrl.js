(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('DeleteStructureCtrl', DeleteStructureCtrl);
  
    /** @ngInject */
    function DeleteStructureCtrl($scope, $filter,$uibModalInstance,structureId,Structure) {

        $scope.deleteStructure = function () {
            debugger;
            Structure.deleteStructure(structureId).then(function (response) {
                debugger;
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  