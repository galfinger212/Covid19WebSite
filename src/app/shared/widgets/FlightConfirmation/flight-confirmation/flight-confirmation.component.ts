import { Component, OnInit } from '@angular/core';
import { destinationConfirmation as DestinationConfirmation } from 'src/models/destinationConfirmation';
import { DestinationsService } from 'src/services/destinations.service';

@Component({
  selector: 'app-flight-confirmation',
  templateUrl: './flight-confirmation.component.html',
  styleUrls: ['./flight-confirmation.component.scss']
})
export class FlightConfirmationComponent implements OnInit {
  countries: string[] = [];
  destinationConfirmation:DestinationConfirmation;
  countrySelected:string;
  constructor(private destinationsService: DestinationsService) { }
  async ngOnInit(): Promise<void> {
    await this.InitData();
  }
  async selectChanged(selectedCountry) {
  this.destinationsService.filterByDestination(selectedCountry).then((country) => {
  this.destinationConfirmation = country;
  console.log(this.destinationConfirmation);
  
    });
    this.countrySelected = selectedCountry;
    console.log(this.countrySelected);
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

