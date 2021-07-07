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
import { FlightConfirmationComponent } from './widgets/FlightConfirmation/flight-confirmation/flight-confirmation.component';
import { MatCardModule } from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { DetailsComponent } from './widgets/details/details.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SideBarComponent,
    AreaComponent,
    FlightConfirmationComponent,
    DetailsComponent,
    
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
    FlightConfirmationComponent,
    MatCardModule,
    MatGridListModule,
    DetailsComponent
  ]
})
export class SharedModule { }
