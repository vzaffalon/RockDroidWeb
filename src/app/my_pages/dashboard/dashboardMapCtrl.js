/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('RockDroid.pages.dashboard')
        .controller('DashboardMapCtrl', DashboardMapCtrl);
  
    /** @ngInject */
    function DashboardMapCtrl(baConfig, layoutPaths,Statistic,$scope) {
      var layoutColors = baConfig.colors;
      $scope.response = {}
      var map;
      Statistic.getStagesByUf().then(function(response){
        $scope.response = response.data;
        createMap()
      })

      function createMap(){
        var map = AmCharts.makeChart('amChartMap', {
            type: 'map',
            theme: 'blur',
            zoomControl: { zoomControlEnabled: false, panControlEnabled: false },
      
            dataProvider: {
                mapURL: "app/my_pages/dashboard/brazilHigh.svg",
        
              areas: [
                { id:"BR-AC",title: 'Acre', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['AC']},
                {id:"BR-AL",title: 'Alagoas', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['AL']},
                {id:"BR-AM",title: 'Amapá', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['AM']},
                {id:"BR-AP",title: 'Amazonas', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['AP']},
                {id:"BR-BA",title: 'Bahia', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['BA']},
                {id:"BR-CE",title: 'Ceará', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['CE']},
                {id:"BR-DF",title: 'Distrito Federal', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['DF']},
                {id:"BR-ES",title: 'Espírito Santo', color: layoutColors.primaryDark,customData: 'Etapas: ' + $scope.response['ES']},
                {id:"BR-GO",title: 'Goiás', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['GO']},
                {id:"BR-MA",title: 'Maranhão', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['MA']},
                {id:"BR-MG",title: 'Mato Grosso', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['MG']},
                {id:"BR-MS",title: 'Mato Grosso do Sul', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['MS']},
                {id:"BR-MT",title: 'Minas Gerais', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['MT']},
                {id:"BR-PA",title: 'Pará', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['PA']},
                {id:"BR-PB",title: 'Paraíba', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['PB']},
                {id:"BR-PE",title: 'Paraná', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['PE']},
                {id:"BR-PI",title: 'Pernambuco', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['PI']},
                {id:"BR-PR",title: 'Piauí', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['PR']},
                {id:"BR-RJ",title: 'Rio de Janeiro', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['RJ']},
                {id:"BR-RN",title: 'Rio Grande do Norte', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['RN']},
                {id:"BR-RO",title: 'Rio Grande do Sul', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['RO']},
                {id:"BR-RR",title: 'Rondônia', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['RR']},
                {id:"BR-RS",title: 'Roraima', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['RS']},
                {id:"BR-SC",title: 'Santa Catarina', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['SC']},
                {id:"BR-SE",title: 'São Paulo', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['SE']},
                {id:"BR-SP",title: 'Sergipe', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['SP']},
                {id:"BR-TO",title: 'Tocantins', color: layoutColors.primary,customData: 'Etapas: ' + $scope.response['TO']}
    
              ]
            },
      
            areasSettings: {
              rollOverOutlineColor: layoutColors.border,
              rollOverColor: layoutColors.primaryDark,
              alpha: 0.8,
              unlistedAreasAlpha: 0.2,
              unlistedAreasColor: layoutColors.defaultText,
              balloonText: '[[title]]: [[customData]]'
            },
      
      
            legend: {
              width: '100%',
              marginRight: 27,
              marginLeft: 27,
              equalWidths: false,
              backgroundAlpha: 0.3,
              backgroundColor: layoutColors.border,
              borderColor: layoutColors.border,
              borderAlpha: 1,
              top: 362,
              left: 0,
              horizontalGap: 10,
              data: [
              ],
            },
            export: {
              enabled: true
            },
            creditsPosition: 'bottom-right',
            pathToImages: layoutPaths.images.amChart
          });

      }
    }
  })();