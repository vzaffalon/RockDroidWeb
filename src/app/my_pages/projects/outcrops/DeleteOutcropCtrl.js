(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('DeleteOutcropCtrl', DeleteOutcropCtrl);
  
    /** @ngInject */
    function DeleteOutcropCtrl($scope, $filter,$uibModalInstance,outcropId,Outcrop) {

        $scope.deleteOutcrop = function () {
            Outcrop.deleteOutcrop(outcropId).then(function (response) {
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  