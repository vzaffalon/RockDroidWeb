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


    RockModel.listRocksFromOutcrop = function(outcrop_id) {
        return $http({
            url: baseUrl,
            method: "GET",
            params: {
                outcrop_id: outcrop_id
            }
        });
    };

    RockModel.updateRock = function (data) {
        if(data.updated_at){
            delete data['updated_at'];
        }
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
