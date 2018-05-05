(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('LoginCtrl', LoginCtrl);
  
    /** @ngInject */
    function LoginCtrl($scope, $filter, editableOptions, editableThemes,$state) {


        $scope.goToDashboard = function(){
            $state.go('pages.dashboard')
        }
  }
  
  })();
  