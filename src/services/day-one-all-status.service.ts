import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DayOneAllStatus } from 'src/models/DayOneAllStatus';
import { URL } from '../models/DataEnum';

@Injectable({
  providedIn: 'root'
})
export class DayOneAllStatusService {
  dayOneAllStatusData: DayOneAllStatus[] = [];
  dayOneAllStatusDataConfirmed: number[] = [];

  constructor(private httpClient: HttpClient) { }

  private GetData(countryName: string, GetDataProperty: { (): number[] }): Promise<number[]> {
    return new Promise((res, rej) => {
      this.httpClient.get<any>(URL.DayOneAllStatus + countryName).subscribe(data => {
        this.dayOneAllStatusData = data;
        res(GetDataProperty());
      }, error => rej(error));
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
  async GetByCountryDatesAsync(countryName: string): Promise<number[]> {
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



