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


    UserModel.getUser = function(user_id) {

        return $http({
            url: baseUrl + user_id,
            method: "GET"
        });
    };

    UserModel.updateUser = function(user_id,data) {
        return $http({
            url: baseUrl + user_id,
            method: "PATCH",
            data: data,
        });
    };


    UserModel.login = function(email,password){
        var data = {
            "email": email,
            "password": password,
        }
        return $http({
            url: baseUrl + "login",
            method: "POST",
            data: data
        });
    }

    return UserModel;
});