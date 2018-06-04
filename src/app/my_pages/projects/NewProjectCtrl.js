(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewProjectCtrl', NewProjectCtrl);
  
    /** @ngInject */
    function NewProjectCtrl($scope, $filter,$uibModalInstance,userId,Project) {
        
        $scope.project = {};
        $scope.project.user_id = userId;

        $scope.newProject = function () {
            $scope.project.creation_date = moment($scope.project.creation_date).valueOf()
            Project.createProject($scope.project).then(function (response) {
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  