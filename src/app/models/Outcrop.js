'use strict';

angular.module('RockDroid.pages').factory('Outcrop', function ($http, $q, ApiEndpoint,$window) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/outcrops/';

    var OutcropModel = {};

    $http.defaults.headers.common.Authorization = $window.localStorage.auth_token;

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


    OutcropModel.listOutcropsFromStage = function(stage_id) {
        return $http({
            url: baseUrl,
            method: "GET",
            params: {
                stage_id: stage_id
            }
        });
    };

    OutcropModel.listUserOutcrops = function(user_id) {
        return $http({
            url: baseUrl + 'user_outcrops',
            method: "GET",
            params: {
                user_id: user_id
            }
        });
    };


    OutcropModel.updateOutcrop = function (data) {
        if(data.updated_at){
            delete data['updated_at'];
        }
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
