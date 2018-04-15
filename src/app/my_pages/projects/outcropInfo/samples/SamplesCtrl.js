(function () {
    'use strict';
  
    angular.module('RockDroid.pages.projects')
      .controller('SamplesCtrl', SamplesCtrl);
  
    /** @ngInject */
    function SamplesCtrl($scope,$uibModal,$stateParams,Sample) {
      $scope.smartTablePageSize = 8;

      $scope.samples = [];
  
      var getSamples = function () {
        Sample.listSamples().then(function (response) {
          $scope.samples1 = angular.copy(response.data);
        }) 
      }

      getSamples();

      $scope.editSample = function (sample) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/my_pages/projects/outcropInfo/samples/edit_sample.html',
          controller: 'EditSampleCtrl',
          size: 'md',
          resolve: {
            sampleObject: function () {
              return angular.copy(sample);
            }
          }
        });
        modalInstance.result.then(function () {
            getSamples();
        }, function () {
          
        });
      };
  
      $scope.deleteSample = function (id) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/my_pages/projects/outcropInfo/samples/delete_sample.html',
          controller: 'DeleteSampleCtrl',
          size: 'md',
          resolve: {
            sampleId: function () {
              return id;
            }
          }
        });
  
        modalInstance.result.then(function () {
          getSamples();
        }, function () {
        });
      }

      $scope.newSample = function () {
         var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'app/my_pages/projects/outcropInfo/samples/new_sample.html',
          controller: 'NewSampleCtrl',
          size: 'md',
          resolve: {
            outcropId: function () {
              return $stateParams.outcropId;
            }
          }
        });

        modalInstance.result.then(function () {
          getSamples();
        }, function () {
        });
      };
    }
  
  })();
  