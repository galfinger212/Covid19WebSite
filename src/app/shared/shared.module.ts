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

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SideBarComponent,
    AreaComponent,
    
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
    HighchartsChartModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    AreaComponent
  ]
})
export class SharedModule { }
