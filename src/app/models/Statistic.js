'use strict';

angular.module('RockDroid.pages').factory('Statistic', function ($http, $q, ApiEndpoint,$window) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/statistics/';

    var StatisticsModel = {};

    $http.defaults.headers.common.Authorization = $window.localStorage.auth_token;

    StatisticsModel.getSizes = function() {
        return $http({
            url:  baseUrl + 'sizes',
            method: "GET"
        });
    };

    StatisticsModel.getAllPictures = function() {
        return $http({
            url:  baseUrl + 'photos_list',
            method: "GET"
        });
    };

    StatisticsModel.getAltitudes = function() {
        return $http({
            url:  baseUrl + 'altitudes',
            method: "GET"
        });
    };



    StatisticsModel.getStagesByUf = function() {
        return $http({
            url:  baseUrl + 'stages_by_uf',
            method: "GET"
        });
    };

    return StatisticsModel;
});
