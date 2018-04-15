(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('DeleteStageCtrl', DeleteStageCtrl);
  
    /** @ngInject */
    function DeleteStageCtrl($scope, $filter,$uibModalInstance,stageId,Stage) {

        $scope.deleteStage = function () {
            Stage.deleteStage(stageId).then(function (response) {
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  