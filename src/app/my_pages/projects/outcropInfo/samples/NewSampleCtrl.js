(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewSampleCtrl', NewSampleCtrl);
  
    /** @ngInject */
    function NewSampleCtrl($scope, $filter,$uibModalInstance,outcropId,Sample) {

        $scope.sample = {};
        $scope.sample.outcrop_id = outcropId;

        $scope.newSample = function () {
            Sample.createSample($scope.sample).then(function (response) {
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  