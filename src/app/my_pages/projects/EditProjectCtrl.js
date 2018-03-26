(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('EditProjectCtrl', EditProjectCtrl);
  
    /** @ngInject */
    function EditProjectCtrl($scope, $filter,$uibModalInstance,Project,projectObject) {
        
        $scope.project = projectObject;

        $scope.editProject = function () {
            Project.updateProject($scope.project).then(function (response) {
                debugger;
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  