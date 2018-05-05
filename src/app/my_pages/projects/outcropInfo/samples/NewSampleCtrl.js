(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewSampleCtrl', NewSampleCtrl);
  
    /** @ngInject */
    function NewSampleCtrl($scope, $filter,$uibModalInstance,outcropId,Sample,SamplePhoto,Upload,$q) {

        $scope.sample = {};
        $scope.sample.outcrop_id = outcropId;

        $scope.newSample = function () {
            Sample.createSample($scope.sample).then(function (response) {
                uploadPictures(response)
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

        var uploadPictures = function (response) {
            var promises = [];
            if ($scope.files && $scope.files.length) {
                for (var i = 0; i < $scope.files.length; i++) {
                  var file = $scope.files[i];
                  var photo =
                  {
                      sample_id: response.data.uuid,
                      base64image: file,
                      filename:  response.data.uuid + "_sample_photo"
                  }
                  promises.push(SamplePhoto.createSamplePhoto(photo).then(function (response) {
                  }))
                }
                $q.all(promises).then(function() {
                    $uibModalInstance.close();
                })
            }else{
                $uibModalInstance.close();
            }
        }

        $scope.removePhoto = function (index) {
            $scope.files.splice(index, 1);
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  