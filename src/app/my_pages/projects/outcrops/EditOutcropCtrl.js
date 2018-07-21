(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('EditOutcropCtrl', EditOutcropCtrl);
  
    /** @ngInject */
    function EditOutcropCtrl($scope, $filter,$uibModalInstance,Outcrop,outcropObject,UtmConverter,OutcropPhoto,Upload,$q,$uibModal) {

        $scope.outcrop = outcropObject;

        $scope.location = {};
        $scope.location.type = 'wgs';
        $scope.errors=[];

        if($scope.outcrop.latitude > 0){
            $scope.latitudeZone = 'N';
        }else{
            $scope.outcrop.latitude = -$scope.outcrop.latitude
            $scope.latitudeZone = 'S';
        }

        if($scope.outcrop.longitude > 0){
            $scope.longitudeZone = 'E';
        }else{
            $scope.outcrop.longitude = -$scope.outcrop.longitude
            $scope.longitudeZone = 'W';
        }
        $scope.files = [];

        var getOutcropPhotos = function () {
            OutcropPhoto.listOutcropPhotos($scope.outcrop.uuid).then(function (response) {
             $scope.files = response.data;
            }) 
        }
        getOutcropPhotos();

    
        $scope.$watch('location.type', function(location) {
            var conversion = "";
            switch (location) {
                case 'wgs':
                    if($scope.outcrop.easting && $scope.outcrop.northing){
                        conversion = UtmConverter.toLatLon($scope.outcrop.easting, $scope.outcrop.northing,$scope.outcrop.horizontal_datum,$scope.outcrop.zoneLetter);
                        var latitude = conversion.latitude;
                        if(conversion.latitude < 0){
                            latitude = -latitude;
                            $scope.latitudeZone = 'S';
                        }
                        var longitude = conversion.longitude;
                        if(conversion.longitude < 0){
                            longitude = -longitude;
                            $scope.longitudeZone = 'W';
                        }

                        $scope.outcrop.latitude = latitude;
                        $scope.outcrop.longitude = longitude;
                    }
                    break;

                case 'utm':
                    if($scope.outcrop.latitude && $scope.outcrop.longitude){
                        var latitudeAux = $scope.outcrop.latitude;
                        var longitudeAux = $scope.outcrop.longitude;
                        if($scope.latitudeZone == 'S'){
                            latitudeAux = -latitudeAux;
                        }
                        if($scope.longitudeZone == 'W'){
                            longitudeAux = -longitudeAux;
                        }
                        conversion = UtmConverter.fromLatLon(latitudeAux,longitudeAux);
                        $scope.outcrop.easting = conversion.easting;
                        $scope.outcrop.northing = conversion.northing;
                        $scope.outcrop.horizontal_datum = conversion.zoneNum;
                        $scope.outcrop.zoneLetter = conversion.zoneLetter;
                    }
                    break;

            
                default:
                    break;
            }
        });

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
                    OutcropPhoto.deleteOutcropPhoto(photo.uuid).then(function (response) {
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

        $scope.editOutcrop = function () {
            var outcrop = angular.copy($scope.outcrop);
            $scope.errors = [];
            if($scope.location.type = 'wgs'){
                if($scope.latitudeZone == 'N'){
                    if(outcrop.northing < 0 || outcrop.northing > 9350000){
                        $scope.errors.push("Northing deve estar entre os valores 0 e 9,350,000");
                        return;
                    }
                }
               
                if($scope.latitudeZone == 'S'){
                    if(outcrop.northing < 1100000 || outcrop.northing > 10000000){
                        $scope.errors.push("Northing deve estar entre os valores 1,100,000 e 10,000,000");
                        return;
                    }
                }
    
                if(outcrop.easting < 166000 || outcrop.easting > 834000){
                    $scope.errors.push("Easting deve estar entre os valores 166,000 e 834,000");
                    return;
                }
    
    
                if(outcrop.horizontal_datum < 1 || outcrop.horizontal_datum > 60){
                    $scope.errors.push("Zona longitudinal deve estar entre 1 a 60");
                    return;
                }
            }
        
            if($scope.latitudeZone == 'S'){
              outcrop.latitude = -outcrop.latitude
            }
            if($scope.longitudeZone == 'W'){
               outcrop.longitude = -outcrop.longitude
            }
            Outcrop.updateOutcrop(outcrop).then(function (response) {
                if($scope.files.length > 0){
                    uploadPictures(response);
                }else{
                    $uibModalInstance.close();
                }
            })
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
                  var outcropPhoto =
                  {
                      outcrop_id: response.data.uuid,
                      base64image: file,
                      filename:  response.data.uuid + "_outcrop_photo"
                  }
                  promises.push(OutcropPhoto.createOutcropPhoto(outcropPhoto).then(function (response) {
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
  