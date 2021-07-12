import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { DayOneAllStatusService } from "src/services/day-one-all-status.service"
import { DestinationsService } from 'src/services/destinations.service';
declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);


const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  @Input()  date!: Date ;
  @Output() dateChange = new EventEmitter<Date>();
  countriesDictionary: Map<string, string>;
  chartOptions: {};
  Highcharts = Highcharts;
  xData: any;
  dateData: any;
  activity: any;
  label: any;
  country: string;
  TimeChartData: any;
  countrySelected: string = "israel";
  constructor(private dayService: DayOneAllStatusService) {
    this.countriesDictionary = new Map<string, string>();
  }

  //selected country changed
  async selectChanged(selectedCountry) {
    let div = document.getElementById('container');
    this.removeAllChild(div)
    this.countrySelected = selectedCountry;
    console.log(this.countrySelected);
    this.ngOnInit();
  }

  //remove the previous highchart from the screen
  removeAllChild(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  //init the data of the new highchart
  InitData = async (): Promise<any> => {
    console.log("in init");
    return new Promise(async (res, rej) => {
      let dataDeathes, dataCases, dataRecovering;
      await this.dayService.GetAllCountries().then((array) => {
        this.countriesDictionary = array;
      })

      //set selected options
      let select = document.getElementById("countries");
      let options: HTMLOptionElement[] = [];
      for (let [key, value] of this.countriesDictionary) {
        let option = document.createElement('option');
        option.innerText = key;
        option.value = value;
        options.push(option);
      }

      // sorting the options alphabetically
      options.sort((a, b) => a.innerText.localeCompare(b.innerText));
      options.forEach(o => select.appendChild(o));

      //get array with num of deathes per day
      await this.dayService.GetByCountryDeathsAsync(this.countrySelected).then((array) => {
        dataDeathes = this.dayService.GetDataPerDay(array);
      })

      //get array with num of new Cases per day
      await this.dayService.GetByCountryConfirmedAsync(this.countrySelected).then((array) => {
        dataCases = this.dayService.GetDataPerDay(array);
      })

      //get array with num of Recovering per day
      await this.dayService.GetByCountryRecoveredAsync(this.countrySelected).then((array) => {
        dataRecovering = this.dayService.GetDataPerDay(array);
      })

      //get array with all checked dates
      await this.dayService.GetByCountryDatesAsync(this.countrySelected).then((array) => {
        this.dateData = array;
        console.log(this.dateData);

      })

      //X-axis array
      let xArray = [];
      for (let index = 0; index < dataDeathes.length; index++) {
        xArray.push(index);
      }
      res({
        "xData": xArray,
        "datasets": [{
          "name": "Deaths per day",
          "data": dataDeathes,
          "unit": "people's",
          "type": "area",
          "valueDecimals": 1
        }, {
          "name": "Cases per day",
          "data": dataCases,
          "unit": "people's",
          "type": "area",
          "valueDecimals": 0
        }, {
          "name": "Recovering per day",
          "data": dataRecovering,
          "unit": "people's",
          "type": "area",
          "valueDecimals": 0
        }]
      })
    })

  }
  async ngOnInit(): Promise<void> {
    console.log("inside ngOnInit");

    
    let dateChangeOnInit = new EventEmitter<Date>();
    dateChangeOnInit.subscribe((date) =>{
      this.dateChange.emit(date);
    } )
    await this.InitData().then((result) => {
      this.activity = result;
    });
    let dateData = this.dateData;

    // this.dateChange.emit(this.date);
    //add all the mouse events to the highcharts
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
            if (point !== undefined) {
              let date = dateData[point.category];
              dateChangeOnInit.emit(date);
            }


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
              format: '{value} '
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

