(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('EditOutcropCtrl', EditOutcropCtrl);
  
    /** @ngInject */
    function EditOutcropCtrl($scope, $filter,$uibModalInstance,Outcrop,outcropObject) {

        debugger;
        $scope.outcrop = outcropObject;
        debugger;

        $scope.editOutcrop = function () {
            Outcrop.updateOutcrop($scope.outcrop).then(function (response) {
                debugger;
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }

  }
  
  })();
  