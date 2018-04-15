(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('EditSampleCtrl', EditSampleCtrl);
  
    /** @ngInject */
    function EditSampleCtrl($scope, $filter,$uibModalInstance,Sample,sampleObject) {

        $scope.sample = sampleObject;

        $scope.editSample = function () {
            Sample.updateSample($scope.sample).then(function (response) {
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }

  }
  
  })();
  