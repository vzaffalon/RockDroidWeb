(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('RegisterCtrl', RegisterCtrl);
  
    /** @ngInject */
    function RegisterCtrl($scope, $filter, editableOptions, editableThemes,$state,User,bcrypt) {

        $scope.user = {};
        $scope.password = "";
        $scope.
        $scope.error = ""

        $scope.goToLogin = function(){
            $state.go('login');
        }


        $scope.createNewUser = function () {
            if($scope.password == $scope.password_confirmation){
                $scope.user.password_hash = $scope.passwordToHash($scope.password);
                debugger;
                debugger;
                UserModel.createUser($scope.user).then(function (response) {
                    debugger;
                    if(response.data){
                        $scope.goToLogin();
                    }
                })   
            }else{
                $scope.error = "Senha e confirmação de senha devem ser iguais."
            }
        }



        var workload  = 12;

        $scope.passwordToHash = function (password_plaintext) {
            bcrypt.genSalt(workload, function(err, salt) {
                bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
                    // Store hash in your password DB.
                    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
                        // Store hash in your password DB.
                        return (hash);
                    });
                });
            });
        }
    }
})();
  