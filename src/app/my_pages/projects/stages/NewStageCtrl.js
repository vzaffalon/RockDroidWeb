(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewStageCtrl', NewStageCtrl);
  
    /** @ngInject */
    function NewStageCtrl($scope, $filter,$uibModalInstance,projectId,Stage) {

        $scope.selectedDistrict = 'DF';

        $scope.districts = ['DF','EU','BA','BE','BI','BU'];

        $scope.stage = {};
        $scope.initialDate = moment();
        $scope.stage.project_id = projectId;

        $scope.newStage = function () {
            Stage.createStage($scope.stage).then(function (response) {
                debugger;
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }

  }
  
  })();
  