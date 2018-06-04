(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('PageTopCtrl', PageTopCtrl);
  
    /** @ngInject */
    function PageTopCtrl($scope, $window,$state) {
  
      $scope.logOut = function(){
        $window.localStorage.auth_token = null;
        $window.localStorage.user_id = null;
        $state.go('login')
      }
  
  }
  
  })();
  