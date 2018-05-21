(function () {
  'use strict';

  angular.module('RockDroid.pages.maps')
      .controller('MapsCtrl', MapsCtrl);

  /** @ngInject */
  function MapsCtrl($timeout,$scope,Outcrop,$window) {
    var myMap;

    $scope.outcrops = [];

    Outcrop.listUserOutcrops($window.localStorage.user_id).then(function(response) {
      $scope.outcrops = response.data;
      $scope.outcrops1 = response.data;
      initialize();
    })

    $scope.goToOutcropInfo = function(id){
      $state.go('pages.outcrop_info',{outcropId: id,stageId: $stateParams.stageId,projectId: $stateParams.projectId});
    }

    $scope.goToMapLocation = function(outcrop){
      myMap.setView([outcrop.latitude, outcrop.longitude], 60)
    }

    function initialize() {
            myMap = L.map('mapid').setView([$scope.outcrops[0].latitude, $scope.outcrops[0].longitude], 60);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(myMap);
          
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
    }
      
    
  }

})();
