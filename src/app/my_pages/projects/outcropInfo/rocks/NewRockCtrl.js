(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewRockCtrl', NewRockCtrl);
  
    /** @ngInject */
    function NewRockCtrl($scope, $filter,$uibModalInstance) {

        $scope.closeModal = function () {
            $uibModalInstance.close();
        }
  }
  
  })();
  