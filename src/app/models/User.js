'use strict';

angular.module('RockDroid.pages').factory('User', function ($http, $q, ApiEndpoint) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/users/'

    var UserModel = {};

    UserModel.createUser = function(data) {

        return $http({
            url: baseUrl,
            method: "POST",
            data: data
        });
    };

    return UserModel;
});