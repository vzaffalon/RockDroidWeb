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
          templateUrl: 'app/my_pages/projects/outcropInfo/outcropInfo.html',
          controllerAs: "tabCtrl",
          title: 'Informações do afloramento',
        })
        .state('outcrop_info.rocks', {
          url: '/rocks',
          templateUrl: 'app/my_pages/projects/outcropInfo/rocks/rocksList.html',
          title: 'Rochas',
          controller: "RocksCtrl",
          controllerAs: "listCtrl"
        })
        .state('outcrop_info.structures', {
          url: '/structures',
          templateUrl: 'app/my_pages/projects/outcropInfo/structures/structuresList.html',
          title: 'Estruturas',
          controller: "StructuresCtrl",
          controllerAs: "listCtrl"
        })
        .state('outcrop_info.samples', {
          url: '/samples',
          templateUrl: 'app/my_pages/projects/outcropInfo/samples/samplesList.html',
          title: 'Amostras',
          controller: "SamplesCtrl",
          controllerAs: "listCtrl"
        })
        .state('outcrop_info.detail', {
          url: '/:label/:id',
          templateUrl: 'app/my_pages/projects/outcropInfo/detail/mailDetail.html',
          title: 'Mail',
          controller: "MailDetailCtrl",
          controllerAs: "detailCtrl"
        });
  }

})();
