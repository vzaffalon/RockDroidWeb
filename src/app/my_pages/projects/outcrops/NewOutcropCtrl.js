(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewOutcropCtrl', NewOutcropCtrl);
  
    /** @ngInject */
    function NewOutcropCtrl($scope, $filter,$uibModalInstance,Outcrop,stageId,UtmConverter,OutcropPhoto,$q,Upload) {

        $scope.outcrop = {};
        $scope.initialDate = moment();
        $scope.outcrop.stage_id = stageId;
        $scope.latitudeZone = 'N';
        $scope.longitudeZone = 'E';

        $scope.location = {};
        $scope.location.type = 'wgs';

        $scope.$watch('location.type', function(location) {
            var conversion = "";
            switch (location) {
                case 'wgs':
                    if($scope.outcrop.easting && $scope.outcrop.northing){
                        changeLatitudelongitude();
                        conversion = UtmConverter.toLatLon($scope.outcrop.easting, $scope.outcrop.northing,$scope.outcrop.horizontal_datum);
                        $scope.outcrop.latitude = conversion.latitude;
                        $scope.outcrop.longitude = conversion.longitude;
                    }
                    break;

                case 'utm':
                    if($scope.outcrop.latitude && $scope.outcrop.longitude){
                        changeLatitudelongitude();
                        conversion = UtmConverter.fromLatLon($scope.outcrop.latitude, $scope.outcrop.longitude);
                        $scope.outcrop.easting = conversion.easting;
                        $scope.outcrop.northing = conversion.northing;
                        $scope.outcrop.horizontal_datum = conversion.zoneNum;
                    }
                    break;

            
                default:
                    break;
            }
        });

        var changeLatitudelongitude = function (params) {
            switch ($scope.latitudeZone) {
                case 'N':
                    if($scope.outcrop.latitude < 0){
                        $scope.outcrop.latitude = -($scope.outcrop.latitude)
                    } 
                break;

                case 'S':
                        if($scope.outcrop.latitude > 0){
                            $scope.outcrop.latitude = -($scope.outcrop.latitude)
                        }
                break;

            
                default:
                    break;
            }
            switch ($scope.longitudeZone) {
                case 'E':
                    if($scope.outcrop.longitude < 0){
                        $scope.outcrop.longitude = -($scope.outcrop.longitude)
                    } 
                    break;

                case 'W':
                    if($scope.outcrop.longitude > 0){
                        $scope.outcrop.longitude = -($scope.outcrop.longitude)
                    }
              
                    break;

            
                default:
                    break;
            }
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
                  var outcropPhoto =
                  {
                      outcrop_id: response.data.uuid,
                      base64image: file,
                      filename:  response.data.uuid + "_outcrop_photo"
                  }
                  promises.push(OutcropPhoto.createOutcropPhoto(outcropPhoto).then(function (response) {
                  }))
                  $q.all(promises).then(function() {
                    $uibModalInstance.close();
                  })
                }
            }else{
                $uibModalInstance.close();
            }
        }

        $scope.removePhoto = function (index) {
            $scope.files.splice(index, 1);
        }


        $scope.newOutcrop = function () {
            changeLatitudelongitude();
            Outcrop.createOutcrop($scope.outcrop).then(function (response) {
               uploadPictures(response);
            })
        }


        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }

  }
  
  })();
  