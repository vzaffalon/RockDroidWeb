/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('RockDroid.pages.maps', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('pages.maps', {
          url: '/maps',
          controller: 'MapsCtrl',
          templateUrl: 'app/my_pages/map/maps.html',
          title: 'Mapa',
          sidebarMeta: {
            icon: 'ion-ios-location-outline',
            order: 100,
          },
        })
  }

})();
