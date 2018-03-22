'use strict';

angular.module('RockDroid.pages').factory('Stage', function ($http, $q, ApiEndpoint) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/stages/';

    var StageModel = {};

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

    StageModel.updateStage = function (id, data) {
        return $http({
            url: baseUrl,
            method: "PATCH",
            data: data
        });
    };

    StageModel.deleteStage = function (id) {
        return $http({
            url: baseUrl + id,
            method: "DELETE"
        });
    };

    return StageModel;
});
