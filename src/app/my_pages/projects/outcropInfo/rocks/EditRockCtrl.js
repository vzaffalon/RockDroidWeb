(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('EditRockCtrl', EditRockCtrl);
  
    /** @ngInject */
    function EditRockCtrl($scope, $filter,$uibModalInstance,Rock,rockObject) {

        $scope.rock = rockObject;

        $scope.editRock = function () {
            Rock.updateRock($scope.rock).then(function (response) {
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }

  }
  
  })();
  