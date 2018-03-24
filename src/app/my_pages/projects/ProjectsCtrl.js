(function () {
  'use strict';
  moment.locale('pt-br');

  angular.module('RockDroid.pages.projects')
      .controller('ProjectsCtrl', ProjectsCtrl);

  /** @ngInject */
  function ProjectsCtrl($scope, $filter, editableOptions, editableThemes,$state,Project,$uibModal) {

    $scope.smartTablePageSize = 10;

    $scope.projects = [];

    $scope.goToStages = function () {
      $state.go('stages');
    }

    var getProjects = function () {
      Project.listProjects().then(function (response) {
        $scope.projects = response.data;
      }) 
    }

    getProjects();

    $scope.newProject = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/my_pages/projects/new_project.html',
        controller: 'NewProjectCtrl',
        size: 'md',
        resolve: {
          userId: function () {
            return '7c41df28098935a81504727064243022e6dca-e3d9-44ee-bca8-36ee74f4278f';
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
       
      }, function () {
        
      });
    };

    $scope.deleteProject = function (id) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/my_pages/projects/delete_project.html',
        controller: 'DeleteProjectCtrl',
        size: 'md',
        resolve: {
          projectId: function () {
            return id;
          }
        }
      });

      modalInstance.result.then(function () {
        getProjects();
      }, function () {
      });

    };
}

})();
