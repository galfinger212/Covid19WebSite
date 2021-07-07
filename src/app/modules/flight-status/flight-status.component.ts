import { Component, OnInit } from '@angular/core';
import { color } from 'highcharts';
import { destinationConfirmation as DestinationConfirmation } from 'src/models/destinationConfirmation';
import { DestinationsService } from 'src/services/destinations.service';

@Component({
  selector: 'app-flight-status',
  templateUrl: './flight-status.component.html',
  
  styleUrls: ['./flight-status.component.scss']
})
export class FlightStatusComponent implements OnInit {


  countries: string[] = [];
  isGreen:boolean;
  destinationConfirmation: DestinationConfirmation;
  countrySelected: string;
  constructor(private destinationsService: DestinationsService) { }
  async ngOnInit(): Promise<void> {
    await this.InitData();
  }
  getBackgroundColor(){
    return this.isGreen? 'green' : 'red';
  }
  async selectChanged(selectedCountry) {

    this.destinationsService.filterByDestination(selectedCountry).then((country) => {
      this.destinationConfirmation = country;
      console.log(this.destinationConfirmation[0]);
      this.isGreen = this.destinationConfirmation[0].country_status != 'אדום';
    });
    this.countrySelected = selectedCountry;
    // console.log(this.countrySelected);
    this.ngOnInit();
  }
  InitData = async (): Promise<any> => {
    console.log("in init");

    return new Promise(async () => {

      await this.destinationsService.GetAllCountries().then((array) => {
        this.countries = array;
      })

      //set options
      let select = document.getElementById("countries");
      let options: HTMLOptionElement[] = [];
      for (let value of this.countries) {
        let option = document.createElement('option');
        option.innerText = value;
        option.value = value;
        options.push(option);
        select.appendChild(option);
      }
    });

  }


}
