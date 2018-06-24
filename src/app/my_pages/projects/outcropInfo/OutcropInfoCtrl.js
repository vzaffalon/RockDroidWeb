(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('OutcropInfoCtrl', OutcropInfoCtrl);
  
    /** @ngInject */
    function OutcropInfoCtrl($scope, $filter, editableOptions, editableThemes,$state,$stateParams,Outcrop,UtmConverter,$window) {

        $scope.outcrop = {};
        $scope.latitudeZone = "N"
        $scope.longitudeZone = "E"
        $scope.selectedTab = 'rocks'
        $state.go('pages.outcrop_info.rocks');

        $scope.selectTab = function (tab) {
            $scope.selectedTab = tab;
            $state.go('pages.outcrop_info.' + tab);
        }

        $scope.goBack = function(){
            var outcropId = $stateParams.outcropId;
            var stageId = $stateParams.stageId;
            var projectId = $stateParams.projectId;
            if(!outcropId){
                outcropId = $window.localStorage.getItem('outcropId');
            }
            if(!stageId){
                stageId = $window.localStorage.getItem('stageId')
            }
            if(!projectId){
                projectId = $window.localStorage.getItem('projectId')
            }
            $state.go('pages.outcrops',{outcropId: outcropId,stageId: stageId,projectId: projectId});
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
            var outcropId = $stateParams.outcropId;
            if(!outcropId){
                outcropId = $window.localStorage.getItem('outcropId');
            }
            Outcrop.getOutcrop(outcropId).then(function (response) {
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
          }, {
            label: 'primary_structures',
            name: 'Estruturas Primárias'
          },
          {
            label: 'secondary_structures',
            name: 'Estruturas Secundárias'
          },
           {
            label: 'samples',
            name: 'Amostras'
        }]
    
        $scope.tabs = tabs;
  }
  
  })();