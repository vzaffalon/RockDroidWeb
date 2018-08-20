'use strict';

angular.module('RockDroid.pages').factory('Project', function ($http, $q, ApiEndpoint,$window) {
    var dfd = $q.defer();
    var baseUrl = ApiEndpoint + '/projects/';

    var ProjectModel = {};

    $http.defaults.headers.common.Authorization = $window.localStorage.auth_token;

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

    ProjectModel.updateProject = function (data) {
        if(data.updated_at){
            delete data['updated_at'];
        }
        return $http({
            url: baseUrl + data.uuid,
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

    ProjectModel.getAllProjectData = function (uuid) {
        return $http({
            url: baseUrl + 'get_all_project_data',
            method: "GET",
            params: {
                uuid: uuid,
            }
        });
    };

    return ProjectModel;
});
