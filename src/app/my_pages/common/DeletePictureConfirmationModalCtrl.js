(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('DeletePictureConfirmationModalCtrl', DeletePictureConfirmationModalCtrl);
  
    /** @ngInject */
    function DeletePictureConfirmationModalCtrl($scope, $filter,$uibModalInstance) {


        $scope.confirm = function () {
            $uibModalInstance.close();
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }

  }
  
  })();
  