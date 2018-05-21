(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewRockCtrl', NewRockCtrl);
  
    /** @ngInject */
    function NewRockCtrl($scope, $filter,$uibModalInstance,Rock,outcropId,Upload,RockPhoto,$q,Structure,RockStructureAssociation,$uibModal,$stateParams) {

        $scope.rock = {};
        $scope.rock.outcrop_id = outcropId;

        $scope.rock_type = 'sedimentar';

        $scope.primary_structures = [];
        $scope.secondary_structures = [];

        $scope.newRock = function () {
            switch ($scope.rock_type) {
                case 'sedimentar':
                    $scope.rock.rock_type = 0;
                    break;

                case 'ignea':
                    $scope.rock.rock_type = 1;
                    break;

                case 'metamorfica':
                    $scope.rock.rock_type = 2;
                    break;
            
                default:
                    break;
            }

            Rock.createRock($scope.rock).then(function (response) {
                uploadPictures(response);
            })
        }

        $scope.files = [];

        $scope.fileToBase64 = function (files) {
            Upload.base64DataUrl(files).then(function(urls){
                for (var i = 0; i < urls.length; i++) {
                    $scope.files.push(urls[i]);
                }  
            });
        }

        $scope.$watch('addedFiles', function(files) {
            if(files && files.length > 0){
                Upload.base64DataUrl(files).then(function(urls){
                    for (var i = 0; i < urls.length; i++) {
                        var found = false;
                        for (var j = 0; j < $scope.files.length; j++) {
                           if($scope.files[j] == urls[i]){
                               found = true;
                           }
                        }
                        if(found){
                            //abre modal avisando que foto ja foi adicionada.
                        }else{
                            $scope.files.push(urls[i]);
                        }
                    }  
                });
            }
        })

        $scope.openSelectPrimaryStructureModal = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/my_pages/projects/outcropInfo/rocks/select_primary_structure_modal.html',
                controller: 'SelectPrimaryStructureModalCtrl',
                size: 'md',
                resolve: {
                  outcropId: function () {
                    return outcropId;
                  }
                }
              });
          
              modalInstance.result.then(function (structure) {
                // getStructuresList();
                $scope.primary_structures.push(structure);
              }, function () {
              });
        }

        var getStructuresList = function (params) {
            Structure.listStructuresFromOutcrop(outcropId).then(function (response) {
                $scope.structures = [];
                $scope.structures1 = [];
                for(var i =0;i< response.data.length;i++){
                  if(response.data[i].structure_type == 0){
                    $scope.primary_structures.push(response.data[i]);
                  }else{
                    $scope.secondary_structures.push(response.data[i]);
                  }
                }
                $scope.structures1 = angular.copy($scope.structures)
              }) 
            
        }

        $scope.deletePrimaryStructure = function(structure) {
                for(var i=0;i<$scope.primary_structures.length;i++){
                    if($scope.primary_structures[i].uuid == structure.uuid){
                        $scope.primary_structures.splice(i, 1);
                    }
                }
        }

        $scope.deleteSecondaryStructure = function(structure) {
                for(var i=0;i<$scope.secondary_structures.length;i++){
                    if($scope.secondary_structures[i].uuid == structure.uuid){
                        $scope.secondary_structures.splice(i, 1);
                    }
                }
        }

        $scope.openSelectSecondaryStructureModal = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/my_pages/projects/outcropInfo/rocks/select_secondary_structure_modal.html',
                controller: 'SelectSecondaryStructureModalCtrl',
                size: 'md',
                resolve: {
                  outcropId: function () {
                    return outcropId;
                  }
                }
              });
          
              modalInstance.result.then(function (structure) {
                // getStructuresList()
                $scope.secondary_structures.push(structure);
              }, function () {
              });
        }

        var uploadPictures = function (response) {
            var promises = [];
            if ($scope.files && $scope.files.length) {
                for (var i = 0; i < $scope.files.length; i++) {
                  var file = $scope.files[i];
                  var photo =
                  {
                      rock_id: response.data.uuid,
                      base64image: file,
                      filename:  response.data.uuid + "_rock_photo"
                  }
                  promises.push(RockPhoto.createRockPhoto(photo).then(function (response) {
                  }))
                }
                $q.all(promises).then(function() {
                    createRockStructureAssociations(response);
                  })
            }else{
                createRockStructureAssociations(response);
            }
        }

        var createRockStructureAssociations = function (response) {
            var promises = [];
            for(var i=0;i<$scope.primary_structures.length;i++){
                var data = {
                    "structure_id": $scope.primary_structures[i].uuid,
                    "rock_id": response.data.uuid,
                    "outcrop_id": response.data.outcrop_id,
                }
                promises.push(RockStructureAssociation.createStructureAssociation(data).then(function (response) {
                    
                }))
            }

            for(var i=0;i<$scope.secondary_structures.length;i++){
                var data = {
                    "structure_id":  $scope.secondary_structures[i].uuid,
                    "rock_id": response.data.uuid,
                    "outcrop_id": response.data.outcrop_id,
                }
                promises.push(RockStructureAssociation.createStructureAssociation(data).then(function (response) {
                    
                }))
            }
          
            $q.all(promises).then(function() {
                $uibModalInstance.close();
            })
        }

        $scope.removePhoto = function (index) {
            $scope.files.splice(index, 1);
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  