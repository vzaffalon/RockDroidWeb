(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewProjectCtrl', NewProjectCtrl);
  
    /** @ngInject */
    function NewProjectCtrl($scope, $filter,$uibModalInstance,userId) {
        
        $scope.project = {};
        $scope.project.user_id = userId;

        $scope.newproject = function () {
            Project.newProject($scope.project).then(function (response) {
                debugger;
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  