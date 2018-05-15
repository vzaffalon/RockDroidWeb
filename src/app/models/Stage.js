'use strict';

angular.module('RockDroid.pages').factory('Stage', function ($http, $q, ApiEndpoint,$window) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/stages/';

    var StageModel = {};

    $http.defaults.headers.common.Authorization = $window.localStorage.auth_token;

    StageModel.getStage = function(id) {
        return $http({
            url:  baseUrl + id,
            method: "GET"
        });
    };

    StageModel.createStage = function(data) {

        return $http({
            url: baseUrl,
            method: "POST",
            data: data
        });
    };

    StageModel.listStages = function() {
        return $http({
            url: baseUrl,
            method: "GET"
        });
    };

    StageModel.updateStage = function (data) {
        return $http({
            url: baseUrl + data.uuid,
            method: "PATCH",
            data: data
        });
    };

    StageModel.deleteStage = function (uuid) {
        return $http({
            url: baseUrl,
            method: "DELETE",
            params: {
                uuid: uuid,
            }
        });
    };

    return StageModel;
});
