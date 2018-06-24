(function () {
    'use strict';
  
    angular.module('RockDroid.pages.dashboard')
        .controller('DashboardCtrl', DashboardCtrl);
  
    /** @ngInject */
    function DashboardCtrl($scope, $timeout, baConfig, baUtil,Statistic,$element,layoutPaths,$window,FileSaver,Blob,User) {
      



          function loadPieCharts() {
            var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);

            if($scope.user.is_teacher){
              $scope.charts = [{
                color: pieColor,
                description: 'Projetos criados',
                stats: $scope.sizes.projects_size,
                icon: 'project',
              }, {
                color: pieColor,
                description: 'Etapas criadas',
                stats: $scope.sizes.stages_size,
                icon: 'stage',
              }, {
                color: pieColor,
                description: 'Afloramentos criados',
                stats: $scope.sizes.outcrops_size,
                icon: 'outcrop',
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
                icon: 'rock',
              }
              , {
                color: pieColor,
                description: 'Estruturas criadas',
                stats: $scope.sizes.structures_size,
                icon: 'structure',
              }
              ];
            }else{
              $scope.charts = [{
                color: pieColor,
                description: 'Projetos criados',
                stats: $scope.sizes.projects_size,
                icon: 'project',
              }, {
                color: pieColor,
                description: 'Etapas criadas',
                stats: $scope.sizes.stages_size,
                icon: 'stage',
              }, {
                color: pieColor,
                description: 'Afloramentos criados',
                stats: $scope.sizes.outcrops_size,
                icon: 'outcrop',
              }, {
                color: pieColor,
                description: 'Número de amostras',
                stats: $scope.sizes.samples_size,
                icon: 'person',
              }
              , {
                color: pieColor,
                description: 'Rochas criadas',
                stats: $scope.sizes.rocks_size,
                icon: 'rock',
              }
              , {
                color: pieColor,
                description: 'Estruturas criadas',
                stats: $scope.sizes.structures_size,
                icon: 'structure',
              }
              ];
            }
 

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

          var user_id = $window.localStorage.user_id;
          User.getUser(user_id).then(function (response) {
            $scope.user = response.data;
            Statistic.getSizes().then(function(response){
              $scope.sizes = response.data;
              loadPieCharts();
            })
          })
       

          


          Statistic.getAllPictures().then(function(response){
            $scope.pictures = response.data;
          })
  

          Statistic.getAltitudes().then(function(response){
            $scope.altitudes = response.data;
            createBarChart();
          })

          $scope.downloadPhoto = function(photo){
            var url = dataURItoBlob(photo.base64image)
            FileSaver.saveAs(url, 'outcrop.png');
          }

          function dataURItoBlob(dataURI) {
            // convert base64 to raw binary data held in a string
            // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
            var byteString = atob(dataURI.split(',')[1]);
          
            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
          
            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);
          
            // create a view into the buffer
            var ia = new Uint8Array(ab);
          
            // set the bytes of the buffer to the correct values
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
          
            // write the ArrayBuffer to a blob, and you're done
            var blob = new Blob([ab], {type: mimeString});
            return blob;
          
          }
  

          var createBarChart = function () {
            var layoutColors = baConfig.colors;
            var id = $element[0].getAttribute('id');
            var barChart = AmCharts.makeChart(id, {
              type: 'serial',
              theme: 'blur',
              color: layoutColors.defaultText,
              dataProvider: [
                {
                  country: '0-200 m',
                  visits: $scope.altitudes.one,
                  color: layoutColors.primary
                },
                {
                  country: '201-500 m',
                  visits: $scope.altitudes.two,
                  color: layoutColors.danger
        
                },
                {
                  country: '501-1000 m',
                  visits: $scope.altitudes.three,
                  color: layoutColors.info
                },
                {
                  country: '1001-2000 m',
                  visits: $scope.altitudes.four,
                  color: layoutColors.success
                },
                {
                  country: '2001-3500 m',
                  visits: $scope.altitudes.five,
                  color: layoutColors.warning
                },
                {
                  country: '3501-5000 m',
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
  