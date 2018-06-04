(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('EditRockCtrl', EditRockCtrl);
  
    /** @ngInject */
    function EditRockCtrl($scope, $filter,$uibModalInstance,Rock,rockObject,RockPhoto,$q,Upload,Structure,RockStructureAssociation,$uibModal) {

        $scope.rock = rockObject;

        $scope.primary_structures = [];
        $scope.secondary_structures = [];

        $scope.editRock = function () {
            Rock.updateRock($scope.rock).then(function (response) {
                if($scope.files.length > 0){
                    uploadPictures(response);
                }else{
                    createRockStructureAssociations(response);
                }
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }

        $scope.files = []

        var getRockPhotos = function () {
            RockPhoto.listRockPhotos($scope.rock.uuid).then(function (response) {
             $scope.files = response.data;
            }) 
        }
        getRockPhotos();

        $scope.removePhoto = function (photo,index) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/my_pages/common/delete_picture_confirmation_modal.html',
                controller: 'DeletePictureConfirmationModalCtrl',
                size: 'md',
                resolve: {
                }
              });
              modalInstance.result.then(function () {
                if(photo.uuid){
                    RockPhoto.deleteRockPhoto(photo.uuid).then(function (response) {
                        if(response.data.message){
                            $scope.files.splice(index, 1);
                        }
                    }) 
                }else{
                    //se imagem adicionada mas ainda nao clicou em confirmar
                    $scope.files.splice(index, 1);
                }
              }, function () {
                
              });
        }

        $scope.fileToBase64 = function (files) {
            Upload.base64DataUrl(files).then(function(urls){
                for (var i = 0; i < urls.length; i++) {
                    $scope.files.push(urls[i]);
                }  
            });
        }


        $scope.openSelectPrimaryStructureModal = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/my_pages/projects/outcropInfo/rocks/select_primary_structure_modal.html',
                controller: 'SelectPrimaryStructureModalCtrl',
                size: 'md',
                resolve: {
                  outcropId: function () {
                    return $scope.rock.outcrop_id;
                  }
                }
              });
          
              modalInstance.result.then(function (structure) {
                // getStructuresList();
                structure.new = true;
                $scope.primary_structures.push(structure);
              }, function () {
              });
        }

        var getAssociatedStructuresList = function () {
            RockStructureAssociation.listAssociatedStructures($scope.rock.uuid,$scope.rock.outcrop_id).then(function (response) {
                for(var i =0;i< response.data.length;i++){
                  if(response.data[i].structure_type == 0){
                    $scope.primary_structures.push(response.data[i]);
                  }else{
                    $scope.secondary_structures.push(response.data[i]);
                  }
                }
              }) 
            
        }
        getAssociatedStructuresList();

        $scope.openSelectSecondaryStructureModal = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/my_pages/projects/outcropInfo/rocks/select_secondary_structure_modal.html',
                controller: 'SelectSecondaryStructureModalCtrl',
                size: 'md',
                resolve: {
                  outcropId: function () {
                    return $scope.rock.outcrop_id;
                  }
                }
              });
          
              modalInstance.result.then(function (structure) {
                // getStructuresList()
                structure.new = true;
                $scope.secondary_structures.push(structure);
              }, function () {
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


        var createRockStructureAssociations = function (response) {
            var promises = [];
            for(var i=0;i<$scope.primary_structures.length;i++){
                if($scope.primary_structures[i].new){
                        var data = {
                            "structure_id": $scope.primary_structures[i].uuid,
                            "rock_id": response.data.uuid,
                            "outcrop_id": response.data.outcrop_id,
                        }
                        promises.push(RockStructureAssociation.createStructureAssociation(data).then(function (response) {
                            
                        }))
                }
            }

            for(var i=0;i<$scope.secondary_structures.length;i++){
                if($scope.secondary_structures[i].new){
                    var data = {
                        "structure_id":  $scope.secondary_structures[i].uuid,
                        "rock_id": response.data.uuid,
                        "outcrop_id": response.data.outcrop_id,
                    }
                    promises.push(RockStructureAssociation.createStructureAssociation(data).then(function (response) {
                        
                    }))
                }
            }
          
            $q.all(promises).then(function() {
                $uibModalInstance.close();
            })
        }

        $scope.deletePrimaryStructure = function(structure) {
            if(structure.uuid){
                RockStructureAssociation.deleteStructureAssociation(structure.uuid,$scope.rock.uuid,structure.outcrop_id).then(function(response) {
                    if(response.data){
                        for(var i=0;i<$scope.primary_structures.length;i++){
                            if($scope.primary_structures[i].uuid == structure.uuid){
                                $scope.primary_structures.splice(i, 1);
                            }
                        }
                    }
                })
            }else{
                for(var i=0;i<$scope.primary_structures.length;i++){
                    if($scope.primary_structures[i].uuid == structure.uuid){
                        $scope.primary_structures.splice(i, 1);
                    }
                }
            }
        }

        $scope.deleteSecondaryStructure = function(structure) {
            if(structure.uuid){
                RockStructureAssociation.deleteStructureAssociation(structure.uuid,$scope.rock.uuid,structure.outcrop_id).then(function(response) {
                    if(response.data){
                        for(var i=0;i<$scope.secondary_structures.length;i++){
                            if($scope.secondary_structures[i].uuid == structure.uuid){
                                $scope.secondary_structures.splice(i, 1);
                            }
                        }
                    }
                })
            }else{
                for(var i=0;i<$scope.secondary_structures.length;i++){
                    if($scope.secondary_structures[i].uuid == structure.uuid){
                        $scope.secondary_structures.splice(i, 1);
                    }
                }
            }
        }

        var uploadPictures = function (response) {
            var promises = [];
            if ($scope.files && $scope.files.length) {
                for (var i = 0; i < $scope.files.length; i++) {
                  var file = $scope.files[i];
                  if(!file.uuid){
                  var photo =
                  {
                      rock_id: response.data.uuid,
                      base64image: file,
                      filename:  response.data.uuid + "_rock_photo"
                  }
                  promises.push(RockPhoto.createRockPhoto(photo).then(function (response) {
                  }))
                }
                }
            }else{
                createRockStructureAssociations(response);
            }

            $q.all(promises).then(function() {
                createRockStructureAssociations(response);
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }

  }
  
  })();
  