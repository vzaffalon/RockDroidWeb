(function () {
    'use strict';
  
    angular.module('auth', ['dtrw.bcrypt'])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('register', {
        url: '/register',
        controller: 'RegisterCtrl',
        templateUrl: 'app/my_pages/login/register.html',
        title: 'Cadastro',
      })
      .state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'app/my_pages/login/login.html',
        title: 'Login',
        resolve: {
          userEmail: function($stateParams) {
            return $stateParams.userEmail;;
          }
        }
      })
    }
  
  })();
  