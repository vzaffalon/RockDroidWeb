(function () {
    'use strict';
  
    angular.module('RockDroid.pages.projects')
      .controller('PrimaryStructuresCtrl', PrimaryStructuresCtrl);
  
    /** @ngInject */
    function PrimaryStructuresCtrl($scope,$uibModal,$stateParams,Structure) {
      $scope.smartTablePageSize = 8;

      $scope.structures = [];
  
      var getStructures = function () {
        Structure.listStructuresFromOutcrop($stateParams.outcropId).then(function (response) {
          $scope.structures = [];
          $scope.structures1 = [];
          for(var i =0;i< response.data.length;i++){
            if(response.data[i].structure_type == 0){
              $scope.structures.push(response.data[i]);
            }
          }
          $scope.structures1 = angular.copy($scope.structures)
        }) 
      }

      getStructures();

      $scope.editStructure = function (structure) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/my_pages/projects/outcropInfo/structures/edit_structure.html',
          controller: 'EditStructureCtrl',
          size: 'md',
          resolve: {
            structureObject: function () {
              return angular.copy(structure);
            }
          }
        });
        modalInstance.result.then(function () {
            getStructures();
        }, function () {
          
        });
      };
  
      $scope.deleteStructure = function (id) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/my_pages/projects/outcropInfo/structures/delete_structure.html',
          controller: 'DeleteStructureCtrl',
          size: 'md',
          resolve: {
            structureId: function () {
              return id;
            }
          }
        });
  
        modalInstance.result.then(function () {
          getStructures();
        }, function () {
        });
      }

      $scope.newStructure = function () {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/my_pages/projects/outcropInfo/structures/new_structure.html',
          controller: 'NewStructureCtrl',
          size: 'md',
          resolve: {
            outcropId: function () {
              return $stateParams.outcropId;
            }
            ,
            is_secondary: function () {
              return false;
            }
          }
        });

        modalInstance.result.then(function () {
          getStructures();
        }, function () {
        });
      };


      $scope.getStructureType = function(structure_type){
        switch(structure_type){
          case 0:
            return 'Primária'
            break;

          case 1:
            return 'Secundária'
            break;
        }

      }


    }
  
  })();
  