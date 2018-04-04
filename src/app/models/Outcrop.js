'use strict';

angular.module('RockDroid.pages').factory('Outcrop', function ($http, $q, ApiEndpoint) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/outcrops/';

    var OutcropModel = {};

    OutcropModel.getOutcrop = function(id) {
        return $http({
            url:  baseUrl + 'search/findById',
            method: "GET",
            params: {
                uuid: id,
            }
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

    OutcropModel.updateOutcrop = function (data) {
        return $http({
            url: baseUrl + data.uuid,
            method: "PATCH",
            data: data
        });
    };

    OutcropModel.deleteOutcrop = function (uuid) {
        return $http({
            url: baseUrl,
            method: "DELETE",
            params: {
                uuid: uuid,
            }
        });
    };

    return OutcropModel;
});
