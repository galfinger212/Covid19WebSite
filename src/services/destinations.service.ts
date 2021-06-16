import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { allDataDestinations } from 'src/models/allDataDestination';
import { destinationConfirmation } from 'src/models/destinationConfirmation';
import { URL } from '../models/DataEnum';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {
  destinationConfirmationData: destinationConfirmation[] = [];

  constructor(private httpClient: HttpClient) {}
   
 
  private GetData(GetDataProperty: { (): destinationConfirmation[] }): Promise<destinationConfirmation[]> {
    return new Promise((res,rej) => {
      this.httpClient.get<allDataDestinations>(URL.Destinations).subscribe(data => {
        this.destinationConfirmationData = data.result.records;
        res(GetDataProperty());
      },error => rej(error))
    });
  }

  filterByDestination(destination: string): Promise<destinationConfirmation[]> {
    return this.GetData(() => this.destinationConfirmationData.filter(d => d.destination.toString().includes(destination)));
  }

  filterByStatus(isGreen: boolean): Promise<destinationConfirmation[]> {  
    return this.GetData(() => this.getIsGreen(isGreen));
  }

  getIsGreen(isGreen: boolean): destinationConfirmation[] {
    let c = this.destinationConfirmationData.filter(d => {
      var isRed = d.country_status == "אדום";
      return isGreen == true ? !isRed : isRed;
    });
    return c;
  }
}
