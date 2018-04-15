'use strict';

angular.module('RockDroid.pages').factory('StructurePhoto', function ($http, $q, ApiEndpoint) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/structure_photos/'

    var StructurePhotoModel = {};

    StructurePhotoModel.createStructurePhoto = function(data) {

        return $http({
            url: baseUrl,
            method: "POST",
            data: data
        });
    };

    StructurePhotoModel.listStructurePhotos = function(structureId) {
        return $http({
            url: ApiEndpoint + '/structure/' + structureId + '/structure_photos',
            method: "GET"
        });
    };

    StructurePhotoModel.updateStructurePhoto = function (data) {
        return $http({
            url: baseUrl + data.uuid,
            method: "PATCH",
            data: data
        });
    };

    StructurePhotoModel.deleteStructurePhoto = function (uuid) {
        return $http({
            url: baseUrl,
            method: "DELETE",
            params: {
                uuid: uuid,
            }
        });
    };

    return StructurePhotoModel;
});
