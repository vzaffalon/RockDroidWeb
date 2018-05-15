'use strict';

angular.module('RockDroid.pages').factory('Rock', function ($http, $q, ApiEndpoint,$window) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/rocks/';

    var RockModel = {};
    $http.defaults.headers.common.Authorization = $window.localStorage.auth_token;

    RockModel.getRock = function(id) {
        return $http({
            url:  baseUrl + id,
            method: "GET"
        });
    };

    RockModel.createRock = function(data) {

        return $http({
            url: baseUrl,
            method: "POST",
            data: data
        });
    };

    RockModel.listRocks = function() {
        return $http({
            url: baseUrl,
            method: "GET"
        });
    };

    RockModel.updateRock = function (data) {
        return $http({
            url: baseUrl + data.uuid,
            method: "PATCH",
            data: data
        });
    };

    RockModel.deleteRock = function (uuid) {
        return $http({
            url: baseUrl,
            method: "DELETE",
            params: {
                uuid: uuid,
            }
        });
    };

    return RockModel;
});
