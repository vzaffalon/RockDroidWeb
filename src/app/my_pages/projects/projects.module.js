(function () {
  'use strict';

  angular.module('RockDroid.pages.projects', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('pages.projects', {
          url: '/projects',
          controller: 'ProjectsCtrl',
          templateUrl: 'app/my_pages/projects/projects.html',
          title: 'Projetos',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 300,
          },
        })
        .state('pages.stages', {
          url: '/project/:projectId/stages',
          controller: 'StagesCtrl',
          templateUrl: 'app/my_pages/projects/stages/stages.html',
          title: 'Etapas',
          parent: 'pages'
        })
        .state('pages.outcrops', {
          url: '/stages/:stageId/outcrops',
          controller: 'OutcropsCtrl',
          templateUrl: 'app/my_pages/projects/outcrops/outcrops.html',
          title: 'Afloramentos',
          params: {
              projectId:  null
          }
        })
        .state('pages.profile', {
          url: '/profile',
          controller: 'ProfileCtrl',
          templateUrl: 'app/my_pages/profile/profile.html',
          title: 'Minha conta',
        })
        .state('pages.outcrop_info', {
          url: '/outcrops/:outcropId/outcrop_info',
          controller: 'OutcropInfoCtrl',
          templateUrl: 'app/my_pages/projects/outcropInfo/outcropInfo.html',
          title: 'Informações do afloramento',
          params: {
            stageId:  null,
            projectId: null
        }
        })
        .state('pages.outcrop_info.rocks', {
          url: '/rocks',
          templateUrl: 'app/my_pages/projects/outcropInfo/rocks/rocksList.html',
          title: 'Rochas',
          controller: "RocksCtrl",
          controllerAs: "listCtrl",
        })
        .state('pages.outcrop_info.primary_structures', {
          url: '/primary_structures',
          templateUrl: 'app/my_pages/projects/outcropInfo/structures/primary_structures.html',
          title: 'Estruturas Primárias',
          controller: "PrimaryStructuresCtrl",
          controllerAs: "listCtrl"
          
        })

        .state('pages.outcrop_info.secondary_structures', {
          url: '/secondary_structures',
          templateUrl: 'app/my_pages/projects/outcropInfo/structures/secondary_structures.html',
          title: 'Estruturas Secundárias',
          controller: "SecondaryStructuresCtrl",
          controllerAs: "listCtrl"
        })
        .state('pages.outcrop_info.samples', {
          url: '/samples',
          templateUrl: 'app/my_pages/projects/outcropInfo/samples/samplesList.html',
          title: 'Amostras',
          controller: "SamplesCtrl",
          controllerAs: "listCtrl"
        })
        .state('pages.outcrop_info.detail', {
          url: '/:label/:id',
          templateUrl: 'app/my_pages/projects/outcropInfo/detail/mailDetail.html',
          title: 'Mail',
          controller: "MailDetailCtrl",
          controllerAs: "detailCtrl"
        });
  }

})();
