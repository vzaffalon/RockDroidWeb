(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('OutcropsCtrl', OutcropsCtrl);
  
    /** @ngInject */
    function OutcropsCtrl($scope, $filter, editableOptions, editableThemes,$state,$uibModal,Outcrop,$stateParams,$window) {
  
      $scope.smartTablePageSize = 8;

      $scope.outcrops = [];
  
      var getOutcrops = function () {
        Outcrop.listOutcropsFromStage($stateParams.stageId).then(function (response) {
          $scope.outcrops1 = response.data;
        }) 
      }

      $scope.goBack = function(){
        var stageId = $stateParams.stageId;
        var projectId = $stateParams.projectId;
        if(!stageId){
          stageId = $window.localStorage.getItem('stageId');
        }
        if(!projectId){
          projectId = $window.localStorage.getItem('projectId');
        }

        $state.go('pages.stages',{stageId: stageId,projectId: projectId});
      }
      

      getOutcrops();


      $scope.goToOutcropInfo = function(id){
        var stageId = $stateParams.stageId;
        var projectId = $stateParams.projectId;
        if(!stageId){
          stageId = $window.localStorage.getItem('stageId');
        }
        if(!projectId){
          projectId = $window.localStorage.getItem('projectId');
        }
        $window.localStorage.setItem('outcropId',id);

        $state.go('pages.outcrop_info',{outcropId: id,stageId: stageId,projectId: projectId});
      }

      $scope.newOutcrop = function () {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/my_pages/projects/outcrops/new_outcrop.html',
          controller: 'NewOutcropCtrl',
          size: 'md',
          resolve: {
            stageId: function () {
              return $stateParams.stageId;
            }
          }
        });

        modalInstance.result.then(function () {
          getOutcrops();
      }, function () {
        
      });
      };

      $scope.editOutcrop = function (outcrop) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/my_pages/projects/outcrops/edit_outcrop.html',
          controller: 'EditOutcropCtrl',
          size: 'md',
          resolve: {
            outcropObject: function () {
              return angular.copy(outcrop);
            }
          }
        });
        modalInstance.result.then(function () {
            getOutcrops();
        }, function () {
          
        });
      };
  
      $scope.deleteOutcrop = function (id) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/my_pages/projects/outcrops/delete_outcrop.html',
          controller: 'DeleteOutcropCtrl',
          size: 'md',
          resolve: {
            outcropId: function () {
              return id;
            }
          }
        });
  
        modalInstance.result.then(function () {
          getOutcrops();
        }, function () {
        });
      }
  }
  
  })();
  