import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import  {FlexLayoutModule} from '@angular/flex-layout'
import  {MatDividerModule} from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AreaComponent } from './widgets/area/area.component';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { DetailsComponent } from './widgets/details/details.component';
<<<<<<< HEAD
import  {} from '../modules/flight-status/flight-status.component';
=======
import { FlightStatusComponent } from './modules/flight-status/flight-status.component';

>>>>>>> 3e522e5340d3f1832b52f8b8c89034e9afb7222c
@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SideBarComponent,
    AreaComponent,
<<<<<<< HEAD
    DetailsComponent,
=======
    FlightStatusComponent,

    

   
    DetailsComponent,

>>>>>>> 3e522e5340d3f1832b52f8b8c89034e9afb7222c
    
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    HighchartsChartModule,
    MatCardModule,
    MatGridListModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    AreaComponent,
<<<<<<< HEAD
    MatCardModule,
    MatGridListModule,
    DetailsComponent
=======

    MatCardModule

    
    MatCardModule,
    MatGridListModule,
    DetailsComponent

>>>>>>> 3e522e5340d3f1832b52f8b8c89034e9afb7222c
  ]
})
export class SharedModule { }
