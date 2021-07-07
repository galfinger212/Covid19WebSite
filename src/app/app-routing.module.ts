import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { MainCovidComponent } from './modules/main-covid/main-covid.component';
import { FlightStatusComponent } from './modules/flight-status/flight-status.component';

const routes: Routes = [
  {path:'' , component:DefaultComponent,children:[
    {path:'',component:MainCovidComponent},
    {path:'countries-status',component:FlightStatusComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
