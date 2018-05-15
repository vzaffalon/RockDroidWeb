'use strict';

angular.module('RockDroid.pages').factory('RockPhoto', function ($http, $q, ApiEndpoint,$window) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/rock_photos/'

    var RockPhotoModel = {};

    $http.defaults.headers.common.Authorization = $window.localStorage.auth_token;

    RockPhotoModel.createRockPhoto = function(data) {

        return $http({
            url: baseUrl,
            method: "POST",
            data: data
        });
    };

    RockPhotoModel.listRockPhotos = function(rockId) {
        return $http({
            url: ApiEndpoint + '/rock/' + rockId + '/rock_photos',
            method: "GET"
        });
    };

    RockPhotoModel.updateRockPhoto = function (data) {
        return $http({
            url: baseUrl + data.uuid,
            method: "PATCH",
            data: data
        });
    };

    RockPhotoModel.deleteRockPhoto = function (uuid) {
        return $http({
            url: baseUrl,
            method: "DELETE",
            params: {
                uuid: uuid,
            }
        });
    };

    return RockPhotoModel;
});
