/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('RockDroid.pages.projects', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('projects', {
          url: '/projects',
          controller: 'ProjectsCtrl',
          templateUrl: 'app/my_pages/projects/projects.html',
          title: 'Projetos',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 300,
          },
        })
  }

})();
