'use strict';

angular.module('RockDroid.pages').factory('RockStructureAssociation', function ($http, $q, ApiEndpoint,$window) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/rock_structure_associations/';

    var RockStructureAssociationModel = {};

    $http.defaults.headers.common.Authorization = $window.localStorage.auth_token;

    RockStructureAssociationModel.getStructureAssociation = function(id) {
        return $http({
            url:  baseUrl + id,
            method: "GET"
        });
    };

    RockStructureAssociationModel.createStructureAssociation = function(data) {

        return $http({
            url: baseUrl,
            method: "POST",
            data: data
        });
    };

    RockStructureAssociationModel.listAssociatedStructures = function(rock_id,outcrop_id){
        var data={
            "rock_id": rock_id,
            "outcrop_id": outcrop_id,
        }

        return $http({
            url: baseUrl + '/find_rock_structure_associations',
            method: "GET",
            params: data
        });
    }

    RockStructureAssociationModel.listStructureAssociations = function() {
        return $http({
            url: baseUrl,
            method: "GET"
        });
    };

    RockStructureAssociationModel.updateStructureAssociation = function (data) {
        return $http({
            url: baseUrl + data.uuid,
            method: "PATCH",
            data: data
        });
    };

    RockStructureAssociationModel.deleteStructureAssociation = function (structure_id,rock_id,outcrop_id) {
        return $http({
            url: baseUrl + '/delete_rock_structure_association_by_rock',
            method: "POST",
            params: {
                structure_id: structure_id,
                rock_id: rock_id,
                outcrop_id: outcrop_id
            }
        });
    };

    return RockStructureAssociationModel;
});
