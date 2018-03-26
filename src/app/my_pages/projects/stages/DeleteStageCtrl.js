(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('DeleteStageCtrl', DeleteStageCtrl);
  
    /** @ngInject */
    function DeleteStageCtrl($scope, $filter,$uibModalInstance,stageId,Stage) {

        $scope.deleteStage = function () {
            debugger;
            Stage.deleteStage(stageId).then(function (response) {
                debugger;
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  