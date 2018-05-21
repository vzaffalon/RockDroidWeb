(function () {
  'use strict';

  angular.module('RockDroid.pages.projects')
    .controller('RocksCtrl', RocksCtrl);

  /** @ngInject */
  function RocksCtrl($scope,$uibModal,$stateParams,Rock) {

  $scope.smartTablePageSize = 8;

  $scope.rocks = [];

  var getRocks = function () {
    Rock.listRocksFromOutcrop($stateParams.outcropId).then(function (response) {
      $scope.rocks1 = response.data;
    }) 
  }

  getRocks();

  $scope.editRock = function (rock) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/my_pages/projects/outcropInfo/rocks/edit_rock.html',
      controller: 'EditRockCtrl',
      size: 'md',
      resolve: {
        rockObject: function () {
          return angular.copy(rock);
        }
      }
    });
    modalInstance.result.then(function () {
        getRocks();
    }, function () {
      
    });
  };

  $scope.deleteRock = function (id) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/my_pages/projects/outcropInfo/rocks/delete_rock.html',
      controller: 'DeleteRockCtrl',
      size: 'md',
      resolve: {
        rockId: function () {
          return id;
        }
      }
    });

    modalInstance.result.then(function () {
      getRocks();
    }, function () {
    });
  }

  $scope.newRock = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/my_pages/projects/outcropInfo/rocks/new_rock.html',
      controller: 'NewRockCtrl',
      size: 'md',
      resolve: {
        outcropId: function () {
          return $stateParams.outcropId;
        }
      }
    });

    modalInstance.result.then(function () {
      getRocks();
    }, function () {
    });
  };

  $scope.getRockType = function (rock_type) {
    switch (rock_type) {
      case 0:
        return 'sedimentar'
        break;
  
      case 1:
        return 'ignea'
        break;
  
      case 2:
        return 'metamorfica'
        break;  
    
      default:
        break;
    }
  }


}


})();
