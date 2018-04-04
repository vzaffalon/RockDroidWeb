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

        $scope.selectedZone = 'N';
        $scope.latitudeZone = 'N';
        $scope.longitudeZone = 'E';

        $scope.location = {};
        $scope.location.type = 'wgs';

        debugger;
        $scope.$watch('location.type', function(location) {
            debugger;
            var conversion = "";
            switch (location) {
                case 'wgs':
                    if($scope.outcrop.easting && $scope.outcrop.northing){
                        debugger;
                        conversion = UtmConverter.toLatLon($scope.outcrop.easting, $scope.outcrop.northing,$scope.outcrop.horizontal_datum);
                        $scope.outcrop.latitude = conversion.latitude;
                        $scope.outcrop.longitude = conversion.longitude;
                        debugger;
                    }
                    break;

                case 'utm':
                    if($scope.outcrop.latitude && $scope.outcrop.longitude){
                        debugger;
                        conversion = UtmConverter.fromLatLon($scope.outcrop.latitude, $scope.outcrop.longitude);
                        $scope.outcrop.easting = conversion.easting;
                        $scope.outcrop.northing = conversion.northing;
                        $scope.outcrop.horizontal_datum = conversion.zoneLetter;
                        debugger;
                    }
                    break;

            
                default:
                    break;
            }
        });

        $scope.$watch('latitudeZone', function(location) {
            switch (location) {
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

        });

        $scope.$watch('longitudeZone', function(location) {
            switch (location) {
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

        });

        $scope.newOutcrop = function () {
            debugger;
            Outcrop.createOutcrop($scope.outcrop).then(function (response) {
                debugger;
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  