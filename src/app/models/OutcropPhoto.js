'use strict';

angular.module('RockDroid.pages').factory('OutcropPhoto', function ($http, $q, ApiEndpoint) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/outcrop_photos/'

    var OutcropPhotoModel = {};

    OutcropPhotoModel.createOutcropPhoto = function(data) {

        return $http({
            url: baseUrl,
            method: "POST",
            data: data
        });
    };

    OutcropPhotoModel.listOutcropPhotos = function(outcropId) {
        
        return $http({
            url: ApiEndpoint + '/outcrop/'+ outcropId + '/outcrop_photos',
            method: "GET"
        });
    };

    OutcropPhotoModel.updateOutcropPhoto = function (data) {
        return $http({
            url: baseUrl + data.uuid,
            method: "PATCH",
            data: data
        });
    };

    OutcropPhotoModel.deleteOutcropPhoto = function (uuid) {
        return $http({
            url: baseUrl,
            method: "DELETE",
            params: {
                uuid: uuid,
            }
        });
    };

    return OutcropPhotoModel;
});
