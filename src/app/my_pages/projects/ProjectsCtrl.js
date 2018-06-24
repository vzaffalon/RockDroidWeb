(function () {
  'use strict';
  moment.locale('pt-br');

  angular.module('RockDroid.pages.projects')
      .controller('ProjectsCtrl', ProjectsCtrl);

  /** @ngInject */
  function ProjectsCtrl($scope, $filter, editableOptions, editableThemes,$state,Project,$uibModal,$window,User) {

    $scope.smartTablePageSize = 8;

    $scope.projects = [];

    $scope.goToStages = function (project) {
      $window.localStorage.setItem('projectId',project.uuid);
      $state.go('pages.stages',{projectId: project.uuid});
    }

    var user_id = $window.localStorage.user_id;
    User.getUser(user_id).then(function (response) {
      $scope.user = response.data;
  })

    var getProjects = function () {
      Project.listProjects().then(function (response) {
        $scope.projects = response.data.projects;
        $scope.projects1 = response.data.projects;
        $scope.users = response.data.users;
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
            return $window.localStorage.user_id;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
         $scope.newStage();
      }, function () {
        
      });
    };

    $scope.newStage = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/my_pages/projects/stages/new_stage.html',
        controller: 'NewStageCtrl',
        size: 'md',
        resolve: {
          projectId: function () {
            return $stateParams.projectId;
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

    $scope.exportToXls = function(rock_id){
      Project.getAllProjectData(rock_id).then(function(response){
        if(response.data){
          var data = response.data;
          $scope.generateXlsFile(data.projects,'projetos.xlsx');
          $scope.generateXlsFile(data.stages,'etapas.xlsx');
          $scope.generateXlsFile(data.outcrops,'afloramentos.xlsx');
          $scope.generateXlsFile(data.samples,'amostras.xlsx');
          $scope.generateXlsFile(data.rocks,'rochas.xlsx');
          $scope.generateXlsFile(data.structures,'estruturas.xlsx');
        }
      })
    }

    $scope.generateXlsFile = function(data,filename){
        /* starting from this data */
        /* generate a worksheet */
        var ws = XLSX.utils.json_to_sheet(data);
  
        /* add to workbook */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Presidents");
  
        /* write workbook and force a download */
        XLSX.writeFile(wb, filename);
    }

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
