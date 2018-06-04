(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('OutcropInfoCtrl', OutcropInfoCtrl);
  
    /** @ngInject */
    function OutcropInfoCtrl($scope, $filter, editableOptions, editableThemes,$state,$stateParams,Outcrop,UtmConverter) {

        $scope.outcrop = {};
        $scope.latitudeZone = "N"
        $scope.longitudeZone = "E"

        $state.go('pages.outcrop_info.rocks');

        $scope.selectTab = function (tab) {
            $state.go('pages.outcrop_info.' + tab);
        }

        $scope.goBack = function(){
            $state.go('pages.outcrops',{outcropId: $stateParams.outcropId,stageId: $stateParams.stageId,projectId: $stateParams.projectId});
        }

        var getLatitudeLongitudeZone = function () {
            if($scope.outcrop.latitude > 0){
                $scope.latitudeZone = "N"
            }else{
                if($scope.outcrop.latitude == 0){
                    $scope.latitudeZone = ""
                }else{
                    $scope.latitudeZone = "S"
                }
            }

            if($scope.outcrop.longitude > 0){
                $scope.longitudeZone = "E"
            }else{
                if($scope.outcrop.longitude == 0){
                    $scope.longitudeZone = ""
                }else{
                    $scope.longitudeZone = "W"
                }
            }
            $scope.outcrop.latitudeShow = $scope.outcrop.latitude
            $scope.outcrop.longitudeShow = $scope.outcrop.longitude
        }
          

        var getOutcrop = function () {
            Outcrop.getOutcrop($stateParams.outcropId).then(function (response) {
              $scope.outcrop = response.data;
              getEastingNorthing();
              getLatitudeLongitudeZone();
            }) 
        }
        getOutcrop();


        var getEastingNorthing = function () {
            if($scope.outcrop.latitude && $scope.outcrop.longitude){
                var conversion = UtmConverter.fromLatLon($scope.outcrop.latitude, $scope.outcrop.longitude);
                $scope.outcrop.easting = conversion.easting;
                $scope.outcrop.northing = conversion.northing;
                $scope.outcrop.horizontal_datum = conversion.zoneNum;
            }
        }
        

        var tabs =  [{
            label: 'rocks',
            name: 'Rochas',
            newMails: 7
          }, {
            label: 'primary_structures',
            name: 'Estrutura Primária'
          },
          {
            label: 'secondary_structures',
            name: 'Estrutura Secundária'
          },
           {
            label: 'samples',
            name: 'Amostras'
        }]
    
        $scope.tabs = tabs;
  }
  
  })();