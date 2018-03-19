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
        .state('stages', {
          url: '/stages',
          controller: 'StagesCtrl',
          templateUrl: 'app/my_pages/projects/stages/stages.html',
          title: 'Etapas',
        })
        .state('outcrops', {
          url: '/outcrops',
          controller: 'OutcropsCtrl',
          templateUrl: 'app/my_pages/projects/outcrops/outcrops.html',
          title: 'Afloramentos',
        })
        .state('outcrop_info', {
          url: '/outcrop_info',
          controller: 'OutcropInfoCtrl',
          templateUrl: 'app/my_pages/projects/outcropInfo/outcrop_info.html',
          title: 'Informações do afloramento',
        })
  }

})();
