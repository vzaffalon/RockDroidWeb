(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewRockCtrl', NewRockCtrl);
  
    /** @ngInject */
    function NewRockCtrl($scope, $filter,$uibModalInstance,Rock,outcropId,Upload,RockPhoto,$q) {

        $scope.rock = {};
        $scope.rock.outcrop_id = outcropId;

        $scope.rock_type = 'sedimentar';

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
  