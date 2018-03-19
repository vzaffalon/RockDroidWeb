(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('StagesCtrl', StagesCtrl);
  
    /** @ngInject */
    function StagesCtrl($scope, $filter, editableOptions, editableThemes,$state) {
  
      $scope.smartTablePageSize = 5;

      $scope.goToOutcrops = function () {
        $state.go('outcrops');
      }

      $scope.smartTableData = [
        {
          id: 1,
          name: 'Etapa A',
          city: 'Brasília',
          uf: 'DF',
          initial_date: moment().locale('pt-br').format('LL'),
          created_at: moment().locale('pt-br').format('LL'),
        },
        {
            id:2,
            name: 'Etapa B',
            city: 'Brasília',
            uf: 'DF',
            initial_date: moment().locale('pt-br').format('LL'),
            created_at: moment().locale('pt-br').format('LL'),
          },
          {
            id: 3,
            name: 'Etapa C',
            city: 'Brasília',
            uf: 'DF',
            initial_date: moment().locale('pt-br').format('LL'),
            created_at: moment().locale('pt-br').format('LL'),
          },
          {
            id: 1,
            name: 'Etapa D',
            city: 'Brasília',
            uf: 'DF',
            initial_date: moment().locale('pt-br').format('LL'),
            created_at: moment().locale('pt-br').format('LL'),
          },
          {
            id: 1,
            name: 'Etapa E',
            city: 'Brasília',
            uf: 'DF',
            initial_date: moment().locale('pt-br').format('LL'),
            created_at: moment().locale('pt-br').format('LL'),
          },
          {
            id: 1,
            name: 'Etapa F',
            city: 'Brasília',
            uf: 'DF',
            initial_date: moment().locale('pt-br').format('LL'),
            created_at: moment().locale('pt-br').format('LL'),
          },
      ];
  }
  
  })();
  