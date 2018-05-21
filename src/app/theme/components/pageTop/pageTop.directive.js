/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('RockDroid.theme.components')
      .directive('pageTop', ['$window','User', function($window,User) {

        function link(scope, element, attrs) {
          scope.user = {};
          var user_id= $window.localStorage.user_id;
          User.getUser(user_id).then(function (response) {
              scope.user = response.data;
          })

          scope.logOut = function(){
            $window.localStorage.user_id = null;
            $state.go('login')
          }
        }
      
        return {
          link: link,
          restrict: 'E',
          templateUrl: 'app/theme/components/pageTop/pageTop.html'
        };
      }]);

})();