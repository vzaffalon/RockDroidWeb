/**
 * @author a.demeshko
 * created on 1/12/16
 */
(function () {
  'use strict';

  angular.module('RockDroid.pages.tutorial', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('pages.tutorial', {
        url: '/tutorial',
        controller: 'TutorialCtrl',
        templateUrl: 'app/my_pages/tutorial/tutorial.html',
          title: 'Tutorial',
          sidebarMeta: {
            icon: 'ion-ios-pulse',
            order: 400,
          },
      });
  }
})();