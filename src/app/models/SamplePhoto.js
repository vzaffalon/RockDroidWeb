'use strict';

angular.module('RockDroid.pages').factory('SamplePhoto', function ($http, $q, ApiEndpoint) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/sample_photos/'

    var SamplePhotoModel = {};

    SamplePhotoModel.createSamplePhoto = function(data) {

        return $http({
            url: baseUrl,
            method: "POST",
            data: data
        });
    };

    SamplePhotoModel.listSamplePhotos = function(sampleId) {
        return $http({
            url: ApiEndpoint + '/sample/' + sampleId + '/sample_photos',
            method: "GET"
        });
    };

    SamplePhotoModel.updateSamplePhoto = function (data) {
        return $http({
            url: baseUrl + data.uuid,
            method: "PATCH",
            data: data
        });
    };

    SamplePhotoModel.deleteSamplePhoto = function (uuid) {
        return $http({
            url: baseUrl,
            method: "DELETE",
            params: {
                uuid: uuid,
            }
        });
    };

    return SamplePhotoModel;
});
