(function () {
    'use strict';
  
    angular.module('auth', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'app/my_pages/login/login.html',
        title: 'Login',
      })
      .state('register', {
        url: '/register',
        controller: 'RegisterCtrl',
        templateUrl: 'app/my_pages/login/register.html',
        title: 'Registro',
      })
    }
  
  })();
  