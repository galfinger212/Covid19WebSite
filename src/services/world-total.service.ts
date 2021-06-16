import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WorldTotal } from 'src/models/WorldTotal';
import {URL} from '../models/DataEnum';

@Injectable({
  providedIn: 'root'
})
export class WorldTotalService {

  constructor(private httpClient: HttpClient) {}
   
 public worldData:WorldTotal | null = null;
   GetData(): Promise<WorldTotal> {
    return new Promise((res,rej) => {
      this.httpClient.get<WorldTotal>(URL.WorldTotal).subscribe(data => {
        this.worldData = data;
        res(this.worldData);
      },error => rej(error))
    });
  }
}
