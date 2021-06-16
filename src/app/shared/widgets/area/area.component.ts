import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);

 import * as newdata from '../../data';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;
  xData: any;
  activity: any;
  label:any;
  constructor() { 
    this.activity = newdata.TimeChartData;
  }
  ngOnInit(): void {
    ['mousemove', 'touchmove', 'touchstart'].forEach(function (eventType) {
      document.getElementById('container').addEventListener(
        eventType,
        function (e) {
          var chart,
            point,
            i,
            event;

          for (i = 0; i < Highcharts.charts.length; i = i + 1) {
            chart = Highcharts.charts[i];
            // Find coordinates within the chart
            event = chart.pointer.normalize(e);
            // Get the hovered point
            point = chart.series[0].searchPoint(event, true);

            if (point) {
              point.highlight(e);
            }
          }
        }
      );
    });
    function syncExtremes(e) {
      var thisChart = this.chart;

      if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
        Highcharts.each(Highcharts.charts, function (chart) {
          if (chart !== thisChart) {
            if (chart.xAxis[0].setExtremes) { // It is null while updating
              chart.xAxis[0].setExtremes(
                e.min,
                e.max,
                undefined,
                false,
                { trigger: 'syncExtremes' }
              );
            }
          }
        });
      }
    }
    Highcharts.Pointer.prototype.reset = function () {
      return undefined;
    };
    Highcharts.Point.prototype.select = function (event) {
      event = this.series.chart.pointer.normalize(event);
      this.onMouseOver(); // Show the hover marker
      this.series.chart.tooltip.refresh(this); // Show the tooltip
      this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
    };
    this.xData = this.activity.xData;
    let that = this;
    if (this.activity) {
      this.activity.datasets.forEach(function (dataset, i) {

        dataset.data = Highcharts.map(dataset.data, function (val, j) {
          return [that.xData[j], val];
        });


        var chartDiv = document.createElement('div');
        chartDiv.className = 'chart';
        document.getElementById('container').appendChild(chartDiv);

        Highcharts.chart(chartDiv, {
          chart: {
            marginLeft: 40, // Keep all charts left aligned
            spacingTop: 20,
            spacingBottom: 20
          },
          title: {
            text: dataset.name,
            align: 'left',
            margin: 0,
            x: 30
          },
          credits: {
            enabled: false
          },
          legend: {
            enabled: false
          },
          xAxis: {
            crosshair: true,
            events: {
              setExtremes: syncExtremes
            },
            labels: {
              format: '{value} km'
            }
          },
          yAxis: {
            title: {
              text: null
            }
          },
          tooltip: {
            positioner: function () {
              return {
                // right aligned
                x: this.chart.chartWidth - 200,
                y: 10 // align to title
              };
            },
            borderWidth: 0,
            backgroundColor: 'none',
            pointFormat: '{point.y}',
            headerFormat: '',
            shadow: false,
            style: {
              fontSize: '20px'
            },
            valueDecimals: dataset.valueDecimals
          },
          series: [{
            data: dataset.data,
            name: dataset.name,
            type: dataset.type,
            color: Highcharts.getOptions().colors[i],
            fillOpacity: 0.5,
            tooltip: {
              valueSuffix: ' ' + dataset.unit
            }
          }]
        });
      });
    }
    HC_exporting(this.Highcharts);
  }
}
