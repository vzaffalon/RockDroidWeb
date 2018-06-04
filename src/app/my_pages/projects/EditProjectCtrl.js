(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('EditProjectCtrl', EditProjectCtrl);
  
    /** @ngInject */
    function EditProjectCtrl($scope, $filter,$uibModalInstance,Project,projectObject) {
        
        $scope.project = projectObject;
        $scope.project.creation_date = moment().toDate();

        $scope.editProject = function () {
            $scope.project.creation_date = moment($scope.project.creation_date).valueOf()
            Project.updateProject($scope.project).then(function (response) {
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  