import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VerifiedCountry } from 'src/models/country';
import { DayOneAllStatus } from 'src/models/DayOneAllStatus';
import { URL } from '../models/DataEnum';

@Injectable({
  providedIn: 'root'
})
export class DayOneAllStatusService {
  dayOneAllStatusData: DayOneAllStatus[] = [];
  dayOneAllStatusDataConfirmed: number[] = [];
  countries:Map<string,string>;

  constructor(private httpClient: HttpClient) {
    this.countries = new Map<string,string>();
   }

  private GetData(countryName: string, GetDataProperty: { (): any[] }): Promise<any[]> {
    return new Promise((res, rej) => {
      this.httpClient.get<any>(URL.DayOneAllStatus + countryName).subscribe(data => {
        this.dayOneAllStatusData = data;
        res(GetDataProperty());
      }, error => rej(error));
    });
  }

  GetAllCountries(): any {
    return new Promise((res, rej) => {
      this.httpClient.get<VerifiedCountry[]>(URL.Countries).subscribe(data => {
        data.forEach(v => this.countries.set(v.Country,v.Slug))
        res(this.countries);
      }, error => rej(error))
    });
 
  }

  async GetByCountryRecoveredAsync(countryName: string): Promise<number[]> {
    return await this.GetData(countryName, () => this.dayOneAllStatusData.map(d => d.Recovered));
  }

  async GetByCountryActiveAsync(countryName: string): Promise<number[]> {
    return await this.GetData(countryName, () => this.dayOneAllStatusData.map(d => d.Active));
  }

  async GetByCountryConfirmedAsync(countryName: string): Promise<number[]> {
    return await this.GetData(countryName, () => this.dayOneAllStatusData.map(d => d.Confirmed));
  }

  async GetByCountryDeathsAsync(countryName: string): Promise<number[]> {
    return await this.GetData(countryName, () => this.dayOneAllStatusData.map(d => d.Deaths));
  }
  async GetByCountryDatesAsync(countryName: string): Promise<string[]> {
    return await this.GetData(countryName, () => this.dayOneAllStatusData.map(d => d.Date));
  }

  GetDataPerDay(array: any[]): any[] {
    let newAttay = [array[0]];
    for (let i = 1; i < array.length; i++) {
      newAttay.push(Math.max(0, array[i] - array[i - 1]));
    }
    return newAttay;
  }
}



