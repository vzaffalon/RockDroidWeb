(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('OutcropInfoCtrl', OutcropInfoCtrl);
  
    /** @ngInject */
    function OutcropInfoCtrl($scope, $filter, editableOptions, editableThemes,$state,$stateParams,Outcrop) {

        $scope.outcrop = {};

        $state.go('outcrop_info.rocks');

        $scope.selectTab = function (tab) {
            $state.go('outcrop_info.' + tab);
        }

        var getOutcrop = function () {
            debugger;
            Outcrop.getOutcrop($stateParams.outcropId).then(function (response) {
                debugger;
              $scope.outcrop = response.data;
            }) 
        }
        getOutcrop();

        var tabs =  [{
            label: 'rocks',
            name: 'Rochas',
            newMails: 7
          }, {
            label: 'primary_structures',
            name: 'Estrutura Primária'
          },
          {
            label: 'secondary_structures',
            name: 'Estrutura Secundária'
          },
           {
            label: 'samples',
            name: 'Amostras'
        }]
    
        $scope.tabs = tabs;
  }
  
  })();