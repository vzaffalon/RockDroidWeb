(function () {
  'use strict';

  angular.module('RockDroid.pages.maps')
      .controller('MapsCtrl', MapsCtrl);

  /** @ngInject */
  function MapsCtrl($timeout,$scope,Outcrop,$window) {
    var myMap;

    $scope.lat = {}
    $scope.lat.latitudeZone = 'N';
    $scope.lat.longitudeZone = 'E';
    $scope.outcrop = {};


    Outcrop.listUserOutcrops($window.localStorage.user_id).then(function(response) {
      $scope.outcrops = response.data;
      $scope.outcrops1 = response.data;
      initialize();
    })

    $scope.goToOutcropInfo = function(id){
      $state.go('pages.outcrop_info',{outcropId: id,stageId: $stateParams.stageId,projectId: $stateParams.projectId});
    }

    $scope.goToMapLocation = function(outcrop){
      myMap.invalidateSize(); 
      myMap.setView(new L.LatLng(outcrop.latitude, outcrop.longitude), 15)
    }

    $scope.searchCoordinates = function(){
      var latSearch = $scope.outcrop.latitude;
      var longSearch = $scope.outcrop.longitude;
      switch ($scope.lat.latitudeZone) {
        case 'N':
            if($scope.outcrop.latitude < 0){
                latSearch = -($scope.outcrop.latitude)
            } 
        break;

        case 'S':
                if($scope.outcrop.latitude > 0){
                  latSearch = -($scope.outcrop.latitude)
                }
        break;

    
        default:
            break;
    }
    switch ($scope.lat.longitudeZone) {
        case 'E':
            if($scope.outcrop.longitude < 0){
              longSearch= -($scope.outcrop.longitude)
            } 
            break;

        case 'W':
            if($scope.outcrop.longitude > 0){
              longSearch = -($scope.outcrop.longitude)
            }
      
            break;

    
        default:
            break;
    }
    myMap.invalidateSize(); 
    myMap.setView(new L.LatLng(latSearch, longSearch), 13)
    }

    $scope.clearCoordinates = function(){
      $scope.outcrop.latitude = "";
      $scope.outcrop.longitude = "";
      myMap.invalidateSize(); 
      myMap.setView(new L.LatLng($scope.outcrops[0].latitude, $scope.outcrops[0].longitude), 15)
    }

    function initialize() {
      setTimeout(function(){
            myMap = L.map('mapid').setView(new L.LatLng($scope.outcrops[0].latitude, $scope.outcrops[0].longitude), 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(myMap);
          
            myMap.invalidateSize(); 
            for(var i=0;i<$scope.outcrops.length;i++){
              var outcrop = $scope.outcrops[i];
              if(!outcrop.altitude){
                outcrop.altitude = '-';
              }
              if(!outcrop.toponomy){
                outcrop.toponomy = '-'
              }
              if(!outcrop.description){
                outcrop.description = '-'
              }
              var message = 'Nome: ' + outcrop.name + "<br>" 
              + 'Altitude: ' + outcrop.altitude + "<br>" 
              + 'Latitude: ' + outcrop.latitude + "<br>" 
              + 'Longintude: ' + outcrop.longitude  + "<br>" 
              + 'Toponímia: ' + outcrop.toponomy  + "<br>" 
              + 'Descrição: ' + outcrop.description;
              L.marker([outcrop.latitude, outcrop.longitude]).addTo(myMap)
                .bindPopup(message)
                .openPopup();
            }
          }, 1000);
    }
      
    
  }

})();
