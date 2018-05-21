(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('SelectPrimaryStructureModalCtrl', SelectPrimaryStructureModalCtrl);
  
    /** @ngInject */
    function SelectPrimaryStructureModalCtrl($scope, $filter,$uibModalInstance,outcropId,$q,Structure) {

            $scope.structures = []

        var getStructuresList = function () {
            Structure.listStructuresFromOutcrop(outcropId).then(function (response) {
                $scope.structures = [];
                $scope.structures1 = [];
                for(var i =0;i< response.data.length;i++){
                  if(response.data[i].structure_type == 0){
                    $scope.structures.push(response.data[i]);
                  }
                }

              }) 
            
        }

        getStructuresList();


        $scope.selectStructure = function (structure) {
            $uibModalInstance.close(structure);
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  