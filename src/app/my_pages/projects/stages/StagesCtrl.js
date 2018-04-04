(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('StagesCtrl', StagesCtrl);
  
    /** @ngInject */
    function StagesCtrl($scope, $filter, editableOptions, editableThemes,$state,$uibModal,Stage,$stateParams) {
  
      $scope.smartTablePageSize = 8;

      $scope.goToOutcrops = function (stage) {
        $state.go('outcrops',{stageId: stage.uuid});
      }

      $scope.stages = [];
  
      var getStages = function () {
        Stage.listStages().then(function (response) {
          debugger;
          $scope.stages1 = response.data;
        }) 
      }

      getStages();

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
          getStages();
      }, function () {
        
      });
      };

      $scope.editStage = function (stage) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/my_pages/projects/stages/edit_stage.html',
          controller: 'EditStageCtrl',
          size: 'md',
          resolve: {
            stageObject: function () {
              return angular.copy(stage);
            }
          }
        });
        modalInstance.result.then(function () {
            getStages();
        }, function () {
          
        });
      };
  
      $scope.deleteStage = function (id) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/my_pages/projects/stages/delete_stage.html',
          controller: 'DeleteStageCtrl',
          size: 'md',
          resolve: {
            stageId: function () {
              return id;
            }
          }
        });
  
        modalInstance.result.then(function () {
          getStages();
        }, function () {
        });
  }
}
  
  })();
  