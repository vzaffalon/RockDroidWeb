'use strict';

angular.module('RockDroid.pages').factory('Sample', function ($http, $q, ApiEndpoint,$window) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/samples/';

    var SampleModel = {};

    $http.defaults.headers.common.Authorization = $window.localStorage.auth_token;

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

    SampleModel.listSamplesFromOutcrop = function(outcrop_id) {
        return $http({
            url: baseUrl,
            method: "GET",
            params:{
                outcrop_id: outcrop_id
            }
        });
    };

    SampleModel.updateSample = function (data) {
        if(data.updated_at){
            delete data['updated_at'];
        }
        return $http({
            url: baseUrl + data.uuid,
            method: "PATCH",
            data: data
        });
    };

    SampleModel.deleteSample = function (uuid) {
        return $http({
            url: baseUrl,
            method: "DELETE",
            params: {
                uuid: uuid,
            }
        });
    };

    return SampleModel;
});
