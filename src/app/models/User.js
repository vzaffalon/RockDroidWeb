'use strict';

angular.module('RockDroid.pages').factory('User', function ($http, $q, ApiEndpoint) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/users/';
    var UserModel = {};

    UserModel.createUser = function(data) {

        return $http({
            url: baseUrl,
            method: "POST",
            data: data,
        });
    };

    UserModel.login = function(email,password){
        var data = {
            "email": email,
            "password_hash": password,
        }
        return $http({
            url: baseUrl + "login",
            method: "POST",
            data: data
        });
    }

    return UserModel;
});