(function () {
  'use strict';
  moment.locale('pt-br');

  angular.module('RockDroid.pages.projects')
      .controller('ProjectsCtrl', ProjectsCtrl);

  /** @ngInject */
  function ProjectsCtrl($scope, $filter, editableOptions, editableThemes,$state,Project) {

    $scope.smartTablePageSize = 5;

    $scope.goToStages = function () {
      $state.go('stages');
    }

    Project.listProjects().then(function (response) {
      debugger;
    })

    $scope.smartTableData = [
      {
        id: 1,
        name: 'Projeto A',
        created_at: moment().locale('pt-br').format('LL'),
      },
      {
        id: 2,
        name: 'Projeto B',
        created_at: moment().format('LL'),
      },
      {
        id: 3,
        name: 'Projeto C',
        created_at: moment().format('LL'),
      },
      {
        id: 4,
        name: 'Projeto D',
        created_at: moment().format('LL'),
      },
      {
        id: 5,
        name: 'Projeto E',
        created_at: moment().format('LL'),
      },
      {
        id: 6,
        name: 'Projeto F',
        created_at: moment().format('LL'),
      },
      {
        id: 7,
        name: 'Projeto G',
        created_at: moment().format('LL'),
      },
    ];
}

})();