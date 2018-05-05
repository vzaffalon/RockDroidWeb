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
      $urlRouterProvider.otherwise('/login');
      $stateProvider
      .state('pages', {
        abstract: true,

        // Note: abstract still needs a ui-view for its children to populate.
        // You can simply add it inline here.
        templateUrl: 'app/my_pages/pages.html',
    })
  
      // baSidebarServiceProvider.addStaticItem({
      //   title: 'Pages',
      //   icon: 'ion-document',
      //   subMenu: [{
      //     title: 'Sign In',
      //     fixedHref: 'auth.html',
      //     blank: true
      //   }, {
      //     title: 'Sign Up',
      //     fixedHref: 'reg.html',
      //     blank: true
      //   }, {
      //     title: 'User Profile',
      //     stateRef: 'profile'
      //   }, {
      //     title: '404 Page',
      //     fixedHref: '404.html',
      //     blank: true
      //   }]
      // });
      // baSidebarServiceProvider.addStaticItem({
      //   title: 'Menu Level 1',
      //   icon: 'ion-ios-more',
      //   subMenu: [{
      //     title: 'Menu Level 1.1',
      //     disabled: true
      //   }, {
      //     title: 'Menu Level 1.2',
      //     subMenu: [{
      //       title: 'Menu Level 1.2.1',
      //       disabled: true
      //     }]
      //   }]
      // });
    }
  
  })();