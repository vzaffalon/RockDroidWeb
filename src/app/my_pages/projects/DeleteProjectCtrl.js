(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('DeleteProjectCtrl', DeleteProjectCtrl);
  
    /** @ngInject */
    function DeleteProjectCtrl($scope, $filter,$uibModalInstance,projectId,Project) {

        $scope.deleteProject = function () {
            Project.deleteProject(projectId).then(function (response) {
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  