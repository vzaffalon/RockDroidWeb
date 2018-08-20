(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewOutcropCtrl', NewOutcropCtrl);
  
    /** @ngInject */
    function NewOutcropCtrl($scope, $filter,$uibModalInstance,Outcrop,stageId,UtmConverter,OutcropPhoto,$q,Upload) {

        $scope.outcrop = {};
        $scope.errors = [];
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
                        conversion = UtmConverter.toLatLon($scope.outcrop.easting, $scope.outcrop.northing,$scope.outcrop.horizontal_datum,'C');
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
            var outcrop = angular.copy($scope.outcrop);
            $scope.errors = [];
            if($scope.location.type != 'wgs'){
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

                debugger;
                if(outcrop.horizontal_datum < 1 || outcrop.horizontal_datum > 60){
                    $scope.errors.push("Zona longitudinal deve estar entre 1 a 60");
                    return;
                }

                debugger;
                var conversion = UtmConverter.toLatLon($scope.outcrop.easting, $scope.outcrop.northing,$scope.outcrop.horizontal_datum,'C');
                outcrop.latitude = conversion.latitude;
                outcrop.longitude = conversion.longitude;
            }else{
                if($scope.latitudeZone == 'S'){
                    outcrop.latitude = -outcrop.latitude
                  }
                  if($scope.longitudeZone == 'W'){
                     outcrop.longitude = -outcrop.longitude
                  }
            }
                  debugger;
                  Outcrop.createOutcrop(outcrop).then(function (response) {
                     uploadPictures(response);
                  })
        
        }


        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }

  }
  
  })();
  