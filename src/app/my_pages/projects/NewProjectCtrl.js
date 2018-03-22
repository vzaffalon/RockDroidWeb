(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewProjectCtrl', NewProjectCtrl);
  
    /** @ngInject */
    function NewProjectCtrl($scope, $filter,$uibModalInstance) {

        $scope.closeModal = function () {
            $uibModalInstance.close();
        }
  }
  
  })();
  