(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('EditStructureCtrl', EditStructureCtrl);
  
    /** @ngInject */
    function EditStructureCtrl($scope, $filter,$uibModalInstance,Structure,structureObject,Upload,$q,StructurePhoto) {

        $scope.structure = structureObject;
        

        if(structureObject.structure_type == 0){
            $scope.structure.structure_type = 'primary'
        }else{
            $scope.structure.structure_type = 'secondary'
        }

        $scope.editStructure = function () {
            var auxStructure =  angular.copy($scope.structure);
            switch(auxStructure.structure_type){
                case "primary":
                    auxStructure.structure_type = 0
                break;
                case "secondary":
                    auxStructure.structure_type = 1
                break;
            }
            Structure.updateStructure(auxStructure).then(function (response) {
               uploadPictures(response)
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }

        $scope.files = []

        var getStructurePhotos = function () {
            StructurePhoto.listStructurePhotos($scope.structure.uuid).then(function (response) {
             $scope.files = response.data;
            }) 
        }
        getStructurePhotos();

        $scope.removePhoto = function (photo,index) {
            if(photo.uuid){
                StructurePhoto.deleteStructurePhoto(photo.uuid).then(function (response) {
                    if(response.data.message){
                        $scope.files.splice(index, 1);
                    }
                }) 
            }else{
                //se imagem adicionada mas ainda nao clicou em confirmar
                $scope.files.splice(index, 1);
            }
        }

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

        var uploadPictures = function (response) {
            var promises = [];
            if ($scope.files && $scope.files.length) {
                for (var i = 0; i < $scope.files.length; i++) {
                  var file = $scope.files[i];
                  if(!file.uuid){
                  var photo =
                  {
                      structure_id: response.data.uuid,
                      base64image: file,
                      filename:  response.data.uuid + "_structure_photo"
                  }
                  promises.push(StructurePhoto.createStructurePhoto(photo).then(function (response) {
                  }))
                }
                }
            }else{
                $uibModalInstance.close();
            }
            $q.all(promises).then(function() {
                $uibModalInstance.close();
              })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }

  }
  
  })();
  