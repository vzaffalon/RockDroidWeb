/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('RockDroid.pages.dashboard', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('pages.dashboard', {
          url: '/dashboard',
          controller: 'DashboardCtrl',
          templateUrl: 'app/my_pages/dashboard/dashboard.html',
          title: 'Dashboard',
        });
  }

})();
