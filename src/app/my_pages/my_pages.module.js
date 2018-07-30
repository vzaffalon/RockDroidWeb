/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('RockDroid.pages', [
      'ui.router',
      'RockDroid.pages.dashboard',
      'RockDroid.pages.maps',
      'RockDroid.pages.projects',
      'RockDroid.pages.tutorial',
      'toastr',
      'chart.js',
      'angular-chartist',
      'angular.morris-chart',
      'textAngular',
    ])
        .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($urlRouterProvider, baSidebarServiceProvider,$stateProvider) {
      $urlRouterProvider.otherwise(function ($injector) {
        var $state = $injector.get('$state');
        $state.go('login');
    });
      $stateProvider
      .state('pages', {
        abstract: true,

        // Note: abstract still needs a ui-view for its children to populate.
        // You can simply add it inline here.
        templateUrl: 'app/my_pages/pages.html',
    })
    }
  
  })();