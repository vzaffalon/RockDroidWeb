(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('OutcropsCtrl', OutcropsCtrl);
  
    /** @ngInject */
    function OutcropsCtrl($scope, $filter, editableOptions, editableThemes,$state,$uibModal) {
  
      $scope.smartTablePageSize = 10;


      $scope.goToOutcropInfo = function(){
        $state.go('outcrop_info');
      }

      $scope.newOutcrop = function () {
        $uibModal.open({
          animation: true,
          templateUrl: 'app/my_pages/projects/outcrops/new_outcrop.html',
          controller: 'NewOutcropCtrl',
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
          name: 'Afloramento A',
          altitude: 10000,
          toponomy: 'Toponomia A',
          description: 'Perto do rio',
          created_at: moment().locale('pt-br').format('LL'),
        },
        {
            id: 2,
            name: 'Afloramento B',
            altitude: 10000,
            toponomy: 'Toponomia B',
            description: 'Perto do rio',
            created_at: moment().locale('pt-br').format('LL'),
          },
          {
            id: 3,
            name: 'Afloramento C',
            altitude: 10000,
            toponomy: 'Toponomia c',
            description: 'Perto do rio',
            created_at: moment().locale('pt-br').format('LL'),
          },
          {
            id: 4,
            name: 'Afloramento D',
            altitude: 10000,
            toponomy: 'Toponomia D',
            description: 'Perto do rio',
            created_at: moment().locale('pt-br').format('LL'),
          },
      ];
  }
  
  })();
  