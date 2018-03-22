(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('OutcropInfoCtrl', OutcropInfoCtrl);
  
    /** @ngInject */
    function OutcropInfoCtrl($scope, $filter, editableOptions, editableThemes,$state) {

        var vm = this;
        vm.navigationCollapsed = true;

        $scope.selectTab = function (tab) {
            $state.go('outcrop_info.' + tab);
        }

        var tabs =  [{
            label: 'rocks',
            name: 'Rochas',
            newMails: 7
          }, {
            label: 'structures',
            name: 'Estruturas'
          }, {
            label: 'samples',
            name: 'Amostras'
        }]
    
        vm.tabs = tabs;
  }
  
  })();