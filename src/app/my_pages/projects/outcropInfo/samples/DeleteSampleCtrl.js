(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('DeleteSampleCtrl', DeleteSampleCtrl);
  
    /** @ngInject */
    function DeleteSampleCtrl($scope, $filter,$uibModalInstance,sampleId,Sample) {

        $scope.deleteSample = function () {
            Sample.deleteSample(sampleId).then(function (response) {
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  