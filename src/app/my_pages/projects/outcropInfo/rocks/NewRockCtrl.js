(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('NewRockCtrl', NewRockCtrl);
  
    /** @ngInject */
    function NewRockCtrl($scope, $filter,$uibModalInstance,Rock,outcropId) {

        $scope.rock = {};
        $scope.rock.outcrop_id = outcropId;

        $scope.rock_type = 'sedimentar';

        $scope.newRock = function () {
            switch ($scope.rock_type) {
                case 'sedimentar':
                    $scope.rock.rock_type = 0;
                    break;

                case 'ignea':
                    $scope.rock.rock_type = 1;
                    break;

                case 'metamorfica':
                    $scope.rock.rock_type = 2;
                    break;
            
                default:
                    break;
            }

            Rock.createRock($scope.rock).then(function (response) {
                debugger;
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }
  }
  
  })();
  