(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('RegisterCtrl', RegisterCtrl);
  
    /** @ngInject */
    function RegisterCtrl($scope, $filter, editableOptions, editableThemes,$state,User,bcrypt) {

        $scope.user = {};
        $scope.password = "";
        $scope.password_confirmation = "";
        $scope.user.name = "";
        $scope.user.email = "";
        $scope.errors = [];

        $scope.goToLogin = function(user_email){
            $state.go('login',{userEmail: user_email});
        }

        var workload  = 12;

        $scope.createNewUser = function () {
            $scope.errors = [];
            if(!$scope.user.name){
                $scope.errors.push("Preencha o campo nome.");
            }

            if(!$scope.user.email){
                $scope.errors.push("Preencha o campo email.");
            }

            if(!$scope.password){
                $scope.errors.push("Preencha o campo senha.");
                return;
            }

            if(!$scope.password_confirmation){
                $scope.errors.push("Preencha o campo confirmação da senha.");
                return;
            }

            if($scope.password == $scope.password_confirmation){
                        $scope.user.password = $scope.password;
                        User.createUser($scope.user).then(function (response) {
                            if(response.data){
                                $scope.goToLogin(response.data.email);
                            }
                        }, function(){
                            $scope.errors.push("Usuário já existe.")
                        }) 
            }else{
                $scope.errors.push("Senha e confirmação de senha devem ser iguais.")
            }
        }

        $scope.passwordToHash = function (password_plaintext) {
            return bcrypt.genSalt(workload, function(err, salt) {
                return bcrypt.hash(password_plaintext, salt, function(err, hash) {
                    // Store hash in your password DB.
                    return (hash);
                });
            });
        }
    }
})();
  