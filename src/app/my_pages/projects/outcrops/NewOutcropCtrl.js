(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewOutcropCtrl', NewOutcropCtrl);
  
    /** @ngInject */
    function NewOutcropCtrl($scope, $filter,$uibModalInstance,Outcrop,stageId,UtmConverter) {

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

        $scope.newOutcrop = function () {
            changeLatitudelongitude();
            Outcrop.createOutcrop($scope.outcrop).then(function (response) {
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  