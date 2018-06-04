(function () {
    'use strict';
    moment.locale('pt-br');
  
    angular.module('RockDroid.pages.projects')
        .controller('EditStageCtrl', EditStageCtrl);
  
    /** @ngInject */
    function EditStageCtrl($scope, $filter,$uibModalInstance,Stage,stageObject) {

        $scope.stage = stageObject;
        $scope.stage.initial_date = moment($scope.stage.initial_date).toDate();

        $scope.editStage = function () {
            $scope.stage.initial_date = moment($scope.stage.initial_date).valueOf();
            Stage.updateStage($scope.stage).then(function (response) {
                $uibModalInstance.close();
            })
        }

        $scope.closeModal = function () {
            $uibModalInstance.dismiss();
        }

        $scope.open = function(){
            $scope.$parent.opened = true
        }

        $scope.options = {
            timezone: 'pt-br',
            minDate: moment(),
            initDate: moment(),
          };


        $scope.districts = [{
            "ID": "1",
            "Sigla": "AC",
            "Nome": "Acre"
        },
             {
            "ID": "2",
            "Sigla": "AL",
            "Nome": "Alagoas"
        },
             {
            "ID": "3",
            "Sigla": "AM",
            "Nome": "Amazonas"
        },
             {
            "ID": "4",
            "Sigla": "AP",
            "Nome": "Amapá"
        },
             {
            "ID": "5",
            "Sigla": "BA",
            "Nome": "Bahia"
        },
             {
            "ID": "6",
            "Sigla": "CE",
            "Nome": "Ceará"
        },
             {
            "ID": "7",
            "Sigla": "DF",
            "Nome": "Distrito Federal"
        },
             {
            "ID": "8",
            "Sigla": "ES",
            "Nome": "Espírito Santo"
        },
             {
            "ID": "9",
            "Sigla": "GO",
            "Nome": "Goiás"
        },
             {
            "ID": "10",
            "Sigla": "MA",
            "Nome": "Maranhão"
        },
             {
            "ID": "11",
            "Sigla": "MG",
            "Nome": "Minas Gerais"
        },
             {
            "ID": "12",
            "Sigla": "MS",
            "Nome": "Mato Grosso do Sul"
        },
             {
            "ID": "13",
            "Sigla": "MT",
            "Nome": "Mato Grosso"
        },
             {
            "ID": "14",
            "Sigla": "PA",
            "Nome": "Pará"
        },
             {
            "ID": "15",
            "Sigla": "PB",
            "Nome": "Paraíba"
        },
             {
            "ID": "16",
            "Sigla": "PE",
            "Nome": "Pernambuco"
        },
             {
            "ID": "17",
            "Sigla": "PI",
            "Nome": "Piauí"
        },
             {
            "ID": "18",
            "Sigla": "PR",
            "Nome": "Paraná"
        },
             {
            "ID": "19",
            "Sigla": "RJ",
            "Nome": "Rio de Janeiro"
        },
             {
            "ID": "20",
            "Sigla": "RN",
            "Nome": "Rio Grande do Norte"
        },
             {
            "ID": "21",
            "Sigla": "RO",
            "Nome": "Rondônia"
        },
             {
            "ID": "22",
            "Sigla": "RR",
            "Nome": "Roraima"
        },
             {
            "ID": "23",
            "Sigla": "RS",
            "Nome": "Rio Grande do Sul"
        },
             {
            "ID": "24",
            "Sigla": "SC",
            "Nome": "Santa Catarina"
        },
             {
            "ID": "25",
            "Sigla": "SE",
            "Nome": "Sergipe"
        },
             {
            "ID": "26",
            "Sigla": "SP",
            "Nome": "São Paulo"
        },
             {
            "ID": "27",
            "Sigla": "TO",
            "Nome": "Tocantins"
        }]

  }
  
  })();
  