/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('RockDroid.theme.components')
    .controller('BaSidebarCtrl', BaSidebarCtrl);

  /** @ngInject */
  function BaSidebarCtrl($scope, baSidebarService,$window) {
 
    $scope.menuItems = baSidebarService.getMenuItems();
    $scope.defaultSidebarState = $scope.menuItems[0].stateRef;
    if($window.localStorage.selectedMenuItem){
      $scope.selectedMenuItem = $window.localStorage.selectedMenuItem;
    }else{
      $scope.selectedMenuItem = 0;
      $window.localStorage.selectedMenuItem = 0
    }



    $scope.setSelectedMenu = function(itemValue){
      $scope.selectedMenuItem = itemValue;
      $window.localStorage.selectedMenuItem = itemValue;
    }

    $scope.hoverItem = function ($event) {
      $scope.showHoverElem = true;
      $scope.hoverElemHeight =  $event.currentTarget.clientHeight;
      var menuTopValue = 66;
      $scope.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - menuTopValue;
    };

    $scope.$on('$stateChangeSuccess', function () {
      if (baSidebarService.canSidebarBeHidden()) {
        baSidebarService.setMenuCollapsed(true);
      }
    });
  }
})();