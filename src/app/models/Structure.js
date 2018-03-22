'use strict';

angular.module('RockDroid.pages').factory('Structure', function ($http, $q, ApiEndpoint) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/structures/';

    var StructureModel = {};

    StructureModel.getStructure = function(id) {
        return $http({
            url:  baseUrl + id,
            method: "GET"
        });
    };

    StructureModel.createStructure = function(data) {

        return $http({
            url: baseUrl,
            method: "POST",
            data: data
        });
    };

    StructureModel.listStructures = function() {
        return $http({
            url: baseUrl,
            method: "GET"
        });
    };

    StructureModel.updateStructure = function (id, data) {
        return $http({
            url: baseUrl,
            method: "PATCH",
            data: data
        });
    };

    StructureModel.deleteStructure = function (id) {
        return $http({
            url: baseUrl + id,
            method: "DELETE"
        });
    };

    return StructureModel;
});
