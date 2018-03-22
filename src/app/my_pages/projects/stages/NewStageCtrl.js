(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewStageCtrl', NewStageCtrl);
  
    /** @ngInject */
    function NewStageCtrl($scope, $filter,$uibModalInstance) {

        $scope.closeModal = function () {
            $uibModalInstance.close();
        }

        $scope.selectedDistrict = 'DF';

        $scope.districts = ['DF','EU','BA','BE','BI','BU'];
  }
  
  })();
  