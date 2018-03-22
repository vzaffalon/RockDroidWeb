'use strict';

angular.module('RockDroid.pages').factory('Outcrop', function ($http, $q, ApiEndpoint) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/outcrops/';

    var OutcropModel = {};

    OutcropModel.getOutcrop = function(id) {
        return $http({
            url:  baseUrl + id,
            method: "GET"
        });
    };

    OutcropModel.createOutcrop = function(data) {

        return $http({
            url: baseUrl,
            method: "POST",
            data: data
        });
    };

    OutcropModel.listOutcrops = function() {
        return $http({
            url: baseUrl,
            method: "GET"
        });
    };

    OutcropModel.updateOutcrop = function (id, data) {
        return $http({
            url: baseUrl,
            method: "PATCH",
            data: data
        });
    };

    OutcropModel.deleteOutcrop = function (id) {
        return $http({
            url: baseUrl + id,
            method: "DELETE"
        });
    };

    return OutcropModel;
});
