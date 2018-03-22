(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('StagesCtrl', StagesCtrl);
  
    /** @ngInject */
    function StagesCtrl($scope, $filter, editableOptions, editableThemes,$state,$uibModal) {
  
      $scope.smartTablePageSize = 10;

      $scope.goToOutcrops = function () {
        $state.go('outcrops');
      }

      $scope.newStage = function () {
        $uibModal.open({
          animation: true,
          templateUrl: 'app/my_pages/projects/stages/new_stage.html',
          controller: 'NewStageCtrl',
          size: 'md',
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });
      };

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
  