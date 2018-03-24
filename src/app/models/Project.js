'use strict';

angular.module('RockDroid.pages').factory('Project', function ($http, $q, ApiEndpoint) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/projects/';

    var ProjectModel = {};

    ProjectModel.getProject = function(id) {
        return $http({
            url:  baseUrl + id,
            method: "GET"
        });
    };

    ProjectModel.createProject = function(data) {

        return $http({
            url: baseUrl,
            method: "POST",
            data: data
        });
    };

    ProjectModel.listProjects = function() {
        return $http({
            url: baseUrl,
            method: "GET"
        });
    };

    ProjectModel.updateProject = function (id, data) {
        return $http({
            url: baseUrl,
            method: "PATCH",
            data: data
        });
    };

    ProjectModel.deleteProject = function (uuid) {
        return $http({
            url: baseUrl,
            method: "DELETE",
            params: {
                uuid: uuid,
            }
        });
    };

    return ProjectModel;
});
