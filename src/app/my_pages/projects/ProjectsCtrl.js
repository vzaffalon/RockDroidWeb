(function () {
  'use strict';
  moment.locale('pt-br');

  angular.module('RockDroid.pages.projects')
      .controller('ProjectsCtrl', ProjectsCtrl);

  /** @ngInject */
  function ProjectsCtrl($scope, $filter, editableOptions, editableThemes,$state,Project,$uibModal) {

    $scope.smartTablePageSize = 8;

    $scope.projects = [];

    $scope.goToStages = function (project) {
      $state.go('pages.stages',{projectId: project.uuid});
    }

    var getProjects = function () {
      Project.listProjects().then(function (response) {
        $scope.projects1 = response.data;
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
            return 'on91auRlxAwb9MdxYDppoA';
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
          getProjects();
      }, function () {
        
      });
    };


    $scope.editProject = function (project) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/my_pages/projects/edit_project.html',
        controller: 'EditProjectCtrl',
        size: 'md',
        resolve: {
          projectObject: function () {
            return angular.copy(project);
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
          getProjects();
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
