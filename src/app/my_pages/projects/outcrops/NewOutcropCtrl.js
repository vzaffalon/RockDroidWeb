(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewOutcropCtrl', NewOutcropCtrl);
  
    /** @ngInject */
    function NewOutcropCtrl($scope, $filter,$uibModalInstance) {

        $scope.closeModal = function () {
            $uibModalInstance.close();
        }
  }
  
  })();
  