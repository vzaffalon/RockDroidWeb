(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewStructureCtrl', NewStructureCtrl);
  
    /** @ngInject */
    function NewStructureCtrl($scope, $filter,$uibModalInstance,Structure,outcropId,Upload,$q,StructurePhoto) {


        $scope.structure = {};
        $scope.structure.outcrop_id = outcropId;

        $scope.structure.structure_type = 'primary';

        $scope.newStructure = function () {
            debugger;
            var auxStructure =  angular.copy($scope.structure);
            switch(auxStructure.structure_type){
                case "primary":
                    auxStructure.structure_type = 0
                break;
                case "secondary":
                    auxStructure.structure_type = 1
                break;
            }
            debugger;
            Structure.createStructure(auxStructure).then(function (response) {
                uploadPictures(response)
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
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
                      structure_id: response.data.uuid,
                      base64image: file,
                      filename:  response.data.uuid + "_structure_photo"
                  }
                  promises.push(StructurePhoto.createStructurePhoto(photo).then(function (response) {
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
  