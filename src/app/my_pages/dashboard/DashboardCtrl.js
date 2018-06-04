(function () {
    'use strict';
  
    angular.module('RockDroid.pages.dashboard')
        .controller('DashboardCtrl', DashboardCtrl);
  
    /** @ngInject */
    function DashboardCtrl($scope, $timeout, baConfig, baUtil,Statistic,$element,layoutPaths) {
      

          function loadPieCharts() {
            var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
            $scope.charts = [{
                color: pieColor,
                description: 'Projetos criados',
                stats: $scope.sizes.projects_size,
                icon: 'person',
              }, {
                color: pieColor,
                description: 'Etapas criadas',
                stats: $scope.sizes.stages_size,
                icon: 'money',
              }, {
                color: pieColor,
                description: 'Afloramentos criados',
                stats: $scope.sizes.outcrops_size,
                icon: 'face',
              }, {
                color: pieColor,
                description: 'Número de alunos',
                stats: $scope.sizes.users_size,
                icon: 'person',
              }
              , {
                color: pieColor,
                description: 'Rochas criadas',
                stats: $scope.sizes.rocks_size,
                icon: 'person',
              }
              , {
                color: pieColor,
                description: 'Estruturas criadas',
                stats: $scope.sizes.structures_size,
                icon: 'person',
              }
              ];

            $('.chart').each(function () {
              var chart = $(this);
              chart.easyPieChart({
                easing: 'easeOutBounce',
                onStep: function (from, to, percent) {
                  $(this.el).find('.percent').text(Math.round(percent));
                },
                barColor: chart.attr('rel'),
                trackColor: 'rgba(0,0,0,0)',
                size: 84,
                scaleLength: 0,
                animation: 2000,
                lineWidth: 9,
                lineCap: 'round',
              });
            });
    
          }

          Statistic.getSizes().then(function(response){
            $scope.sizes = response.data;
            loadPieCharts();
          })


          Statistic.getAllPictures().then(function(response){
            $scope.pictures = response.data;
          })
  

          Statistic.getAltitudes().then(function(response){
            $scope.altitudes = response.data;
            createBarChart();
          })
  

          var createBarChart = function () {
            var layoutColors = baConfig.colors;
            var id = $element[0].getAttribute('id');
            var barChart = AmCharts.makeChart(id, {
              type: 'serial',
              theme: 'blur',
              color: layoutColors.defaultText,
              dataProvider: [
                {
                  country: '0-200',
                  visits: $scope.altitudes.one,
                  color: layoutColors.primary
                },
                {
                  country: '201-500',
                  visits: $scope.altitudes.two,
                  color: layoutColors.danger
        
                },
                {
                  country: '501-1000',
                  visits: $scope.altitudes.three,
                  color: layoutColors.info
                },
                {
                  country: '1001-2000',
                  visits: $scope.altitudes.four,
                  color: layoutColors.success
                },
                {
                  country: '2001-3500',
                  visits: $scope.altitudes.five,
                  color: layoutColors.warning
                },
                {
                  country: '3501-5000',
                  visits: $scope.altitudes.six,
                  color: layoutColors.primaryLight
                }
              ],
              valueAxes: [
                {
                  axisAlpha: 0,
                  position: 'left',
                  gridAlpha: 0.5,
                  gridColor: layoutColors.border,
                }
              ],
              startDuration: 1,
              graphs: [
                {
                  balloonText: '<b>[[category]]: [[value]]</b>',
                  fillColorsField: 'color',
                  fillAlphas: 0.7,
                  lineAlpha: 0.2,
                  type: 'column',
                  valueField: 'visits'
                }
              ],
              chartCursor: {
                categoryBalloonEnabled: false,
                cursorAlpha: 0,
                zoomable: false
              },
              categoryField: 'country',
              categoryAxis: {
                gridPosition: 'start',
                labelRotation: 45,
                gridAlpha: 0.5,
                gridColor: layoutColors.border,
              },
              export: {
                enabled: true
              },
              creditsPosition: 'top-right',
              pathToImages: layoutPaths.images.amChart
            });
          }
        
    }
  })();
  