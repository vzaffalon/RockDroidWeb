'use strict';

angular.module('RockDroid.pages').factory('Sample', function ($http, $q, ApiEndpoint) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/samples/';

    var SampleModel = {};

    SampleModel.getSample = function(id) {
        return $http({
            url:  baseUrl + id,
            method: "GET"
        });
    };

    SampleModel.createSample = function(data) {

        return $http({
            url: baseUrl,
            method: "POST",
            data: data
        });
    };

    SampleModel.listSamples = function() {
        return $http({
            url: baseUrl,
            method: "GET"
        });
    };

    SampleModel.updateSample = function (id, data) {
        return $http({
            url: baseUrl,
            method: "PATCH",
            data: data
        });
    };

    SampleModel.deleteSample = function (id) {
        return $http({
            url: baseUrl + id,
            method: "DELETE"
        });
    };

    return SampleModel;
});
