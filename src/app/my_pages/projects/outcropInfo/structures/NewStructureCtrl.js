(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewStructureCtrl', NewStructureCtrl);
  
    /** @ngInject */
    function NewStructureCtrl($scope, $filter,$uibModalInstance) {

        $scope.closeModal = function () {
            $uibModalInstance.close();
        }
  }
  
  })();
  