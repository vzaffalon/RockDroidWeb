'use strict';

angular.module('RockDroid.pages').factory('Structure', function ($http, $q, ApiEndpoint,$window) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/structures/';

    var StructureModel = {};

    $http.defaults.headers.common.Authorization = $window.localStorage.auth_token;

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

    StructureModel.listStructuresFromOutcrop = function(outcrop_id) {
        return $http({
            url: baseUrl,
            method: "GET",
            params: {
                outcrop_id: outcrop_id
            }
        });
    };


    StructureModel.updateStructure = function (data) {
        return $http({
            url: baseUrl + data.uuid,
            method: "PATCH",
            data: data
        });
    };

    StructureModel.deleteStructure = function (uuid) {
        return $http({
            url: baseUrl,
            method: "DELETE",
            params: {
                uuid: uuid,
            }
        });
    };

    return StructureModel;
});
