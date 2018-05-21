(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('ProfileCtrl', ProfileCtrl);
  
    /** @ngInject */
    function ProfileCtrl($scope,$window, User,Upload) {

        $scope.user = {};
        var user_id= $window.localStorage.user_id;
        $scope.user.user_image;
        User.getUser(user_id).then(function (response) {
            $scope.user = response.data;
        })

        $scope.uploadFile = function (file){
            Upload.base64DataUrl(file).then(function(imageBase64){
                uploadPicture(imageBase64);
            });
        }

        var uploadPicture = function (image) {
            var data = {
                user_image: image,
                uuid: user_id,
            }
            User.updateUser(user_id,data).then(function (response) {
                $scope.user = response.data;
            })
        }

  }
  
  })();
  