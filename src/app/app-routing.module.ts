import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { MainCovidComponent } from './modules/main-covid/main-covid.component';

const routes: Routes = [
  {path:'' , component:DefaultComponent,children:[
    {path:'',component:MainCovidComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
