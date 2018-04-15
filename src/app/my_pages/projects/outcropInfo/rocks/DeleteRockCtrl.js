(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('DeleteRockCtrl', DeleteRockCtrl);
  
    /** @ngInject */
    function DeleteRockCtrl($scope, $filter,$uibModalInstance,rockId,Rock) {

        $scope.deleteRock = function () {
            Rock.deleteRock(rockId).then(function (response) {
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  