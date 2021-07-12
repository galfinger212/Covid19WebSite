import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allDataDestinations } from 'src/models/allDataDestination';
import { VerifiedCountry } from 'src/models/country';
import { destinationConfirmation } from 'src/models/destinationConfirmation';
import { URL } from '../models/DataEnum';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {
  destinationConfirmationArray: destinationConfirmation[] = [];
  countries: string[] = [];
 
  constructor(private httpClient: HttpClient) { 
   
  }


  private GetData(GetDataProperty: { (): any[] }): Promise<any> {
    return new Promise((res, rej) => {
      this.httpClient.get<allDataDestinations>(URL.Destinations).subscribe(data => {
        this.destinationConfirmationArray = data.result.records;
        res(GetDataProperty());
      }, error => rej(error))
    });
  }
 

  GetAllcountriesEnglish(): any {
    return new Promise((res, rej) => {
      this.httpClient.get<any>(URL.allCountries).subscribe(data => {
        let array = data.map(d => d.name);
        res(array);
      })
    });
  }

  GetAllCountriesName(): Promise<string[]> {
    return this.GetData(() => this.destinationConfirmationArray.map(d => d.destination));
  }

  GetAllCountries(): Promise<destinationConfirmation[]> {
    return this.GetData(() => this.destinationConfirmationArray);
  }  

  filterByDestination(destination: string): Promise<destinationConfirmation> {
    return this.GetData(() => this.destinationConfirmationArray.filter(d => d.destination.toString().includes(destination)));
  }

  filterByStatus(isGreen: boolean): Promise<destinationConfirmation[]> {
    return this.GetData(() => this.getIsGreen(isGreen));
  }

  getIsGreen(isGreen: boolean): destinationConfirmation[] {
    let c = this.destinationConfirmationArray.filter(d => {
      var isRed = d.country_status == "אדום";
      return isGreen == true ? !isRed : isRed;
    });
    return c;
  }
}
