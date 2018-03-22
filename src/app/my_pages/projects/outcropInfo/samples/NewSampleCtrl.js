(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewSampleCtrl', NewSampleCtrl);
  
    /** @ngInject */
    function NewSampleCtrl($scope, $filter,$uibModalInstance) {

        $scope.closeModal = function () {
            $uibModalInstance.close();
        }
  }
  
  })();
  