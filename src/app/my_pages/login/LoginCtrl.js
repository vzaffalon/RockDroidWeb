(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('LoginCtrl', LoginCtrl);
  
    /** @ngInject */
    function LoginCtrl($scope, $filter, editableOptions, editableThemes,$state,User,$window,$base64,$stateParams,$timeout) {


        $scope.email = "";
        $scope.password = "";
        $scope.errors = [];

        $scope.goToDashboard = function(){
            $state.go('pages.dashboard')
        }

        $scope.goToRegister = function(){
            $state.go('register')
        }

        $scope.login = function () {
            $scope.errors = [];
            if($scope.email && $scope.password){
                        User.login($scope.email,$scope.password).then(function(response){
                             if(response.data){
                                $window.localStorage.auth_token = $base64.encode(response.data.email) + ':' + $base64.encode(response.data.password_hash)//base 64 de email mais : mais senha
                                $window.localStorage.user_id = response.data.uuid;
                                $scope.goToDashboard();
                             }
                        },(function (error) {
                            $scope.errors.push("Usuário ou senha invalidos.");   
                        }
                        ));
            }else{
                $scope.errors.push("Preencha todos os campos.");
            }
        }


        if($stateParams.userEmail){
            $scope.email = $stateParams.userEmail;
        }
  }
  
  })();
  