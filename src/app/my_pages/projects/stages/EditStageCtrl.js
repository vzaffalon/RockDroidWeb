(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('EditStageCtrl', EditStageCtrl);
  
    /** @ngInject */
    function EditStageCtrl($scope, $filter,$uibModalInstance,Stage,stageObject) {
        $scope.districts = ['DF','EU','BA','BE','BI','BU'];

        $scope.stage = stageObject;

        $scope.editStage = function () {
            Stage.updateStage($scope.stage).then(function (response) {
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }

  }
  
  })();
  