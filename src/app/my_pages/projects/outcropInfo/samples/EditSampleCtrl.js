(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('EditSampleCtrl', EditSampleCtrl);
  
    /** @ngInject */
    function EditSampleCtrl($scope, $filter,$uibModalInstance,Sample,sampleObject,Upload,$q,SamplePhoto) {

        $scope.sample = sampleObject;

        $scope.editSample = function () {
            Sample.updateSample($scope.sample).then(function (response) {
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }

        $scope.files = []

        var getSamplePhotos = function () {
            SamplePhoto.listSamplePhotos($scope.sample.uuid).then(function (response) {
             $scope.files = response.data;
            }) 
        }
        getSamplePhotos();

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
                    SamplePhoto.deleteSamplePhoto(photo.uuid).then(function (response) {
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
                      sample_id: response.data.uuid,
                      base64image: file,
                      filename:  response.data.uuid + "_sample_photo"
                  }
                  promises.push(SamplePhoto.createSamplePhoto(photo).then(function (response) {
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
  