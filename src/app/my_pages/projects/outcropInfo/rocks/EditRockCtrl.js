(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('EditRockCtrl', EditRockCtrl);
  
    /** @ngInject */
    function EditRockCtrl($scope, $filter,$uibModalInstance,Rock,rockObject,RockPhoto,$q,Upload) {

        $scope.rock = rockObject;

        $scope.editRock = function () {
            Rock.updateRock($scope.rock).then(function (response) {
                if($scope.files.length > 0){
                    uploadPictures(response);
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
                      rock_id: response.data.uuid,
                      base64image: file,
                      filename:  response.data.uuid + "_rock_photo"
                  }
                  promises.push(RockPhoto.createRockPhoto(photo).then(function (response) {
                  }))
                }
                }
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
  